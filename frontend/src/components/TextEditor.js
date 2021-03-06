import React from 'react';   
import classNames from 'classnames';

import * as monaco from 'monaco-editor';
//Editor component path set localhost:3000/course/<:id>/edit 
//import Editor from './Editor'; // test

import styles from './TextEditor.module.css';
import Term from './Term';

import logo from '../img/logo.svg';
import fileIcon from '../img/file.svg';


class TextEditor extends React.Component {
  /*
    props
        .getContent()
        .onUpload()
        .allowUpload
  */
  constructor(props) {
      super(props);

      this.state ={
        tabs: [
            { name: null },
        ],
        currentTab: null,
        showEditor: false,
        showTerm: true,
      };
      this.editor = null;
      this.term = React.createRef();
      this.tabList = React.createRef();
      this.lastSizeUpdate = 0;

      this.content = {
        "/src/index.js": "const a = 0;",
        "/app.js": "const あこどぉう = 'ういえおｋ';"
      }

      this.languages = {
          'py': 'python',
          'js': 'javascript',
          'c': 'c',
          'cpp': 'cpp',
      }
  }
  componentDidMount(){
    window.addEventListener("resize", this.updateEditorSize);
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateEditorSize);
  }
  updateEditorSize = (e) => {
      if ( (e.timeStamp - this.lastSizeUpdate) < 500 ) {
        if (this.resizeTimer) window.clearTimeout(this.resizeTimer);
        this.resizeTimer = window.setTimeout(this.resizeEditor, 500);
        return;
      }
      if (this.editor) {
          this.resizeEditor();

          this.lastSizeUpdate = e.timeStamp;
        }
    }
  resizeEditor = () => {
    if (this.resizeTimer) window.clearTimeout(this.resizeTimer)

    let rect = this.editorContainer.getBoundingClientRect();
    this.onEditorResize(rect.width, rect.height);
    this.term.current.updateTerminalSize();
    //console.log("resize: updateEditorSize", rect.width, rect.height)
  }
  containerRef = element => {
      if (!element) {
          // unmount
          return;
      }
      this.editorContainer = element;
      let rect = element.getBoundingClientRect();
      //console.log(rect.width, rect.height)
      //element.style.width = rect.width + "px";
      //element.style.height = rect.height + "px";
      //this.onEditorResize(rect.width, rect.height);
  }
  contentRef = element => {
      if (!element) {
          // unmount
          return;
      }
      this.editor = monaco.editor.create(element, {
          value: '',
          language: 'python',
          theme: "vs-dark",
      })
      this.editorModel = this.editor.getModel();
      this.editorModel.onDidChangeContent(this.onEditorChange);
      this.editor.onKeyDown(this.onEditorKeyDown);
  }
  onEditorResize(width, height) {
      // console.log(width, height)
      this.editor.layout({width, height});
      //this.tabList.current.style.width = width + "px"
  }
  onEditorChange = (e) => {
    this.setTabChanged(this.state.currentTab, true);
  }
  onEditorKeyDown = (e) => {
    if (e.ctrlKey && e.code == 'KeyS') {
        this.saveTab(this.state.currentTab);
    }
  }
  setTabChanged = (path, changed) => {
    let tab =  this.getTab(path);
    if (tab) {
        tab.changed = changed ? tab.changed + 1 : 0;
        this.setState({tabs: this.state.tabs});
        //console.log(tab.path, "changed");
    }
  }

  updateLanguage = () => {
      const m = this.state.currentTab.match(/.*\.(.*?)$/);
      const lang = m && this.languages[m[1]];
      if (lang) {
          this.setLanguage(lang);
      }
  }
  setLanguage = (lang) => {
    if (this.editorModel && lang) {
        monaco.editor.setModelLanguage(this.editorModel, lang);
        console.log("set language to:", lang);
    }
  }

  setEditorScroll(top, left) {
      this.editor.setScrollPosition({scrollTop: top, scrollLeft: left});
  }
  onDragStart = (e) => {
      e.dataTransfer.effectAllowed = 'copy'
      e.dataTransfer.setData("tab", e.currentTarget.dataset["tabpath"]);
  }
  onDragOver = (e) => {
      e.preventDefault();
  }
  onDrop = (e) => {
      e.preventDefault();
      let path = e.dataTransfer.getData("tab");
      let to = e.currentTarget.dataset["tabpath"];
      if (path && to) {
          this.moveTab(path, this.getTabIndex(to));
      }
  }
  onClickTab = (e) => {
      let path = e.currentTarget.dataset["tabpath"];
      if (path) this.activateTab(path);
  }
  onClickBackground = e => {
      if (this.noTab()) this.openTab('src/index.js');
      e.stopPropagation();
  }

  showEditor() {
    this.setState({showEditor: true});
  }
  hideEditor() {
    this.setState({showEditor: false});
  }
  showTerm() {
    this.setState({showTerm: true});
  }
  hideTerm() {
    this.setState({showTerm: true});
  }
  toggleTerm = () => {
    this.setState({showTerm: !this.state.showTerm});
  }

  openTab(path) {
      let id = this.getTabIndex(path);
      if (id !== -1) {
          this.activateTab(path);
          return;
      }

      let newTabs = [];
      for (let v of this.state.tabs) {
          if (v.name) {
              newTabs.push(v);
          }
      }
      //console.log(path)
      //console.log(this.getContent(path))
      let tab = {
          path: path,
          name: path.substring(path.lastIndexOf('/') + 1),
          value: this.getContent(path) || "",
          scroll: null,
          selections: null,
          cursor: null,
          init: false,
          changed: 0,
      };
      newTabs.push(tab);

      this.setState({tabs: newTabs}, (() => {
          if (this.state.tabs.length > 0) {
              this.activateTab(path);
          }
      }).bind(this));

  }
  closeTab(path) {
    console.log("close", path)

    //
      let tabId = this.getTabIndex(path);
      let newTabs = Array.from(this.state.tabs);
      newTabs.splice(tabId, 1);

      let isCurrentTab = path === this.state.currentTab;

      this.setState({
          tabs: newTabs,
          currentTab: isCurrentTab ? null : this.state.currentTab
      }, (() => {
          if (isCurrentTab && this.state.tabs.length > 0) {
              let i = tabId > 0 ? tabId - 1 : 0;
              // console.log(isCurrentTab, tabId, i)
              this.activateTab(this.state.tabs[i].path);
          } else if (this.state.tabs.length === 0) {
            this.hideEditor();
          }
      }).bind(this));

  }
  renameTab = (path, name) => {
    const tab = this.getTab(path);
    if (!tab) return;

    let newPath = tab.path.split('/');
    newPath.pop();
    newPath.push(name);

    tab.path = newPath.join('/');
    tab.name = name;
    tab.value = this.getContent(path);

    console.log(path, this.state.currentTab)

    this.setState({tabs: this.state.tabs}, () => {
      console.log(path, this.state.currentTab)
      if (path === this.state.currentTab) {
          this.setState({currentTab: tab.path});
      }
    });
  }
  saveTab = (path) => {
    this.props.save(path, this.getTabValue(path));
    this.setTabChanged(path, false);
  }
  saveTabState(tab) {
      if (!tab) return;

      tab.value = this.editor.getValue();
      tab.scroll = {
          scrollLeft: this.editor.getScrollLeft(),
          scrollTop: this.editor.getScrollTop(),
      }
      tab.cursor = this.editor.getPosition();
      tab.selections = this.editor.getSelections();
  }
  loadTabState(tab) {
      if (!tab) return;

      this.editor.setValue(tab.value || "");
      if (tab.scroll) this.editor.setScrollPosition(tab.scroll);
      if (tab.cursor) this.editor.setPosition(tab.cursor);
      if (tab.selections) this.editor.setSelections(tab.selections);
  }
  activateTab(path) {
      if (path === this.state.currentTab) return;


      let tab = this.getTab(path);
      if (!tab) return;
      
      let newState = {
          currentTab: path
      };

      let currentTab =  this.getTab(this.state.currentTab);
      if (currentTab) {
          this.saveTabState(currentTab);
          newState.tabs = this.state.tabs;
      } else {
          this.editor.setValue(tab.value);
      }

      this.setState(newState, (() => {
          let tab = this.getTab(path);
          // console.log("load", tab)
          this.loadTabState(tab);
          tab.init = true;

          this.showEditor();

          this.updateLanguage();
      }).bind(this));
      
  }
  updateCurrentTab(path, callback) {
    if (path === this.state.currentTab) return;

    let tab =  this.getTab(path);
    if (!tab) return;

    this.saveTabState(tab)
    this.setState({tabs: this.state.tabs}, callback);
  }
  moveTab(path, to) {
      let from = this.getTabIndex(path);
      let newTabs = [];

      for (let i in this.state.tabs) {
          if (i === from) { //
              continue;
          }
          let right = (i >= from && i <= to);
          
          if (right) {
              newTabs.push(this.state.tabs[i]);
          }
          if (i === to) {
              newTabs.push(this.state.tabs[from]);
          }
          if (!right) {
              newTabs.push(this.state.tabs[i]);
          }
      }

      this.setState({tabs: newTabs});
  }
  getTab(path) {
      for (let v of this.state.tabs) {
          if (v.path === path) {
              return v;
          }
      }
      return; 
  }
  getTabIndex(path) {
      for (let i in this.state.tabs) {
          if (this.state.tabs[i].path === path) {
              return i;
          }
      }
      return -1;
  }
  getTabValue = (path) => {
    if (path === this.state.currentTab) {
        return this.editor.getValue();
    }
    let tab =  this.getTab(path);
    return tab && tab.value;
  }
  noTab() {
      for (let v of this.state.tabs) {
          if (v.name) return false;
      }
      return true;
  }
  getValue = () => {
      return this.editor.getValue();
  }
  getContent(path) {
      if (this.props.getContent) {
          return this.props.getContent(path) || '';
      }
      return this.content[path] || '';
  }


  onClickCloseTab = path => {
    const tab = this.getTab(path);
    if (tab.changed > 1) {
        let result = window.confirm('タブを保存しますか？');
        if (result) {
            this.saveTab(path);
        } else {
            result = window.confirm('変更を破棄しますか？');
            if (!result) {
                return;
            }
        }
    }
    this.closeTab(path); // e.currentTarget.dataset["tabpath"] は使えない
  }

  outputToTerm = (text) => {
      this.term.current.getOutput(text);
  }

  onTermInit = (height) => {
    let rect = this.editorContainer.getBoundingClientRect();
    //console.log(rect.width, rect.height)
    this.onEditorResize(rect.width, rect.height);
  }


  render() {
      const options = {
          selectOnLineNumbers: true
      };
      return (
      <div
        className={styles["window-container"]}

      >
        <div
            className={styles["window-bg"]}
            style={{
                backgroundImage: "url(" + logo + ")",
                display: "flex",
                flexFlow: "column nowrap",
                    flex: "1 1 auto",
                    maxWidth: "100%",
            }}
        >
            <div
                className={styles["window-tablist"]}
                style={{
                    flex: "0 0 auto",
                    maxWidth: "100%",
                    textAlign: "left",
                    opacity: this.state.showEditor && "1" || "0",
                }}
                ref={this.tabList}
            >
            {
                this.state.tabs.map((v, i, ar) => {
                if (!v || !v.name) return;
                    return <div
                    key={i}
                    className={styles["window-tab"]}
                    style={ {
                        backgroundColor: this.state.currentTab === v.path && "rgb(30, 30, 30)" || "#343434",
                        borderRight: ar.length == i + 1 ? "none" : "1.5px solid rgb(37, 37, 38)",
                    } }
                    draggable
                    onDragStart={this.onDragStart}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                    onClick={this.onClickTab}
                    data-tabpath={v.path}
                    >
                    <span
                        className={styles["window-tab-image"]}
                        style={{
                            backgroundImage: "url(" + fileIcon + ")",
                        }}
                    >
                    </span>
                    <span className={styles["window-tab-name"]}>{v.name}</span>
                    <span
                        className={classNames(styles["window-tab-close"], v.changed > 1 ? styles["window-tab-edited"] : "")}
                        onClick={
                            ((e) => {
                                this.onClickCloseTab(v.path);
                                e.stopPropagation();
                            }).bind(this)
                        }
                    ></span>
                    </div>
                })          
            }
            </div>
            <div
                style={{
                    display: "relative",
                    flex: "1 1 auto",
                    width: "100%",
                    overflow: "hidden",
                    paddingTop: "2em",
                    opacity: this.state.showEditor && "1" || "0",
                    backgroundColor: "var(--dark-darkest)",
                }}
                onClick={this.onClickBackground}
            >
                <div style={{
                        display: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                    ref={this.containerRef}
                >
                    <div
                        className={styles["window-content"]}
                        style={{
                            width: "100%",
                        }}
                        ref={this.contentRef}
                    >
                    </div>
                </div>
            </div>
        </div> 
              
        <div className={styles["term-container"]}>
            <div className={styles["term-tablist"]}>
                <div>ターミナル</div>
                <div onClick={this.toggleTerm}>‗</div>
            </div>
            <div className={styles["term-wrapper"]}
                style={{
                    display: this.state.showTerm && "block" || "none",
                    height: "200px",
                }}
            >
                <Term height={200} ref={this.term} run={this.props.run} onInit={this.onTermInit}/>
            </div>
        </div>
      </div>
      );
  }
}



export default TextEditor;
