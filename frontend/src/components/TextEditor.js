import React from 'react';   
import { Scrollbars } from 'react-custom-scrollbars';

import * as monaco from 'monaco-editor';
//Editor component path set localhost:3000/course/<:id>/edit 
//import Editor from './Editor'; // test

import styles from './TextEditor.module.css';
import Term from './Term';

import logo from '../img/logo.svg';

class TextEditor extends React.Component {
  constructor(props) {
      super(props);

      this.state ={
        tabs: [
            { name: null },
        ],
        currentTab: null,
        showEditor: false,
      };
      this.editor = null;
      this.tabList = React.createRef();
  }
  containerRef = element => {
      if (!element) {
          // unmount
          return;
      }
      let rect = element.getBoundingClientRect();
      element.style.width = rect.width + "px";
      element.style.height = rect.height + "px";
      this.onEditorResize(rect.width, rect.height);
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
  }
  onEditorResize(width, height) {
      this.editor.layout();
      this.tabList.current.style.width = width + "px"
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
      let tab = {
          path: path,
          name: path.substring(path.lastIndexOf('/') + 1),
          value: this.getContent(path) || "const a = 0;",
          scroll: null,
          selections: null,
          cursor: null,
          init: false
      };
      newTabs.push(tab);

      this.setState({tabs: newTabs}, (() => {
          if (this.state.tabs.length > 0) {
              this.activateTab(path);
          }
      }).bind(this));

  }
  closeTab(path) {
      let tabId = this.getTabIndex(path);
      let newTabs = Array.from(this.state.tabs);
      newTabs.splice(tabId, 1);
      this.setState({
          tabs: newTabs,
          currentTab: null
      }, (() => {
          if (path === this.state.currentTab && this.state.tabs.length > 0) {
              let i = tabId > 0 ? tabId - 1 : 0;
              this.activateTab(this.state.tabs[i].path);
          } else {
            this.hideEditor();
          }
      }).bind(this));

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

      if (tab.value) this.editor.setValue(tab.value);
      if (tab.scroll) this.editor.setScrollPosition(tab.scroll);
      if (tab.cursor) this.editor.setPosition(tab.cursor);
      if (tab.selections) this.editor.setSelections(tab.selections);
  }
  activateTab(path) {
      if (path === this.state.currentTab) return;

      let tab =  this.getTab(path);
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
          console.log("load", tab)
          this.loadTabState(tab);
          tab.init = true;

          this.showEditor();
      }).bind(this));
      
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
      return {
          "/src/index.js": "const a = 0;",
          "/app.js": "const あこどぉう = 'ういえおｋ';"
      }[path];
  }
  render() {
      const options = {
          selectOnLineNumbers: true
      };
      return (
      <div
          style={{
              position: "relative",
              display: "flex",
              flexFlow: "column",
              width: "100%",
              height: "100%",
              background: "linear-gradient(145deg, #00c1da, #003bca)",
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
          <Scrollbars>
          {
            this.state.tabs.map((v, i, ar) => {
              if (!v || !v.name) return;
                return <div
                  key={i}
                  className={styles["window-tab"]}
                  style={ {
                      backgroundColor: this.state.currentTab === v.path && "rgb(30, 30, 30)" || "rgb(45, 45, 45)",
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
                          backgroundImage: "url(" + logo + ")",
                      }}
                  >
                  </span>
                  {v.name}
                  <span
                      className={styles["window-tab-close"]}
                      onClick={
                          ((e) => {
                              this.closeTab(v.path); // e.currentTarget.dataset["tabpath"] は使えない
                              e.stopPropagation();
                          }).bind(this)
                      }
                  ></span>
                </div>
            })          
          }
          </Scrollbars>
          </div>
          <div
              style={{
                  flex: "1 1 auto",
                  width: "100%",
                  overflow: "hidden",
                  opacity: this.state.showEditor && "1" || "0",
              }}
              onClick={this.onClickBackground}
              ref={this.containerRef}
          >
              <div
                  className={styles["window-content"]}
                  style={{
                      height: "100%",
                      width: "100%",
                  }}
                  ref={this.contentRef}
              >
              </div>
          </div>
          <div
              style={{
                  flex: "0 0 auto",
                  //position: "absolute",
                  width: "100%",
                  height: "auto",
                  top: "auto",
                  bottom: "0",
              }}
          >
              <Term height={200} />
          </div>
      </div>
      );
  }
}



export default TextEditor;
