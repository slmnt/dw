import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './Mylayout.css'

import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
/*
import 'brace/mode/python';
import 'brace/mode/java'
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
*/

import * as monaco from 'monaco-editor'; 
import Editor from './Editor'; // test


import 'xterm/src/xterm.css';
import * as xterm from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';

import logo from '../logo.svg';
import { Z_BLOCK } from 'zlib';


let Terminal = xterm.Terminal;
Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

function runFakeTerminal(term) {
  if (term._initialized) {
    return;
  }

  term._initialized = true;

  term.prompt = () => {
    term.write('\r\n$ ');
  };

  term.writeln('Welcome to xterm.js');
  term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
  term.writeln('Type some keys and commands to play around.');
  term.writeln('');
  term.prompt();

  term._core.register(term.addDisposableListener('key', (key, ev) => {
    const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.keyCode === 13) {
      term.prompt();
    } else if (ev.keyCode === 8) {
     // Do not delete the prompt
      if (term.x > 2) {
        term.write('\b \b');
      }
    } else if (printable) {
      term.write(key);
    }
  }));

  term._core.register(term.addDisposableListener('paste', (data, ev) => {
    term.write(data);
  }));
}

class Term extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
      }
    }
    termRef = element => {
        if (!element) {
            // unmount
            return;
        }
        let rect = element.getBoundingClientRect();
        element.style.width = rect.width + "px";
        element.style.height = rect.height + "px";

        let term = new xterm.Terminal();
        this.term = term;
        term.open(element);
        term.winptyCompatInit();
        term.webLinksInit();
        term.fit();
        term.focus();
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ') 
        runFakeTerminal(this.term)

        const stringOptions = {
            //bellSound: null,
            //bellStyle: 'none', //['none', 'sound'],
            //cursorStyle: 'block', //['block', 'underline', 'bar'],
            //experimentalCharAtlas: 'none', //['none', 'static', 'dynamic'],
            fontFamily: "Consolas, 'Courier New', monospace",
            //fontWeight: 'normal', //['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
            //fontWeightBold: 'normal', //['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
            //rendererType: ['dom', 'canvas'],
            //fontColor: "#cccccc",
            theme: {
                background: "rgb(37, 37, 38)",
                foreground: "#cccccc",
                cursor: "#cccccc",
            }
        };
        for (let k in stringOptions) {
            term.setOption(k, stringOptions[k]);
        }
    }
    render() {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                <div
                    style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
                    ref={this.termRef}
                ></div>
            </div>
        );
    }
}

class DirTree extends Component {
    constructor (props) {
      super(props);
      this.state = {
        fileData: {
        }
      }
    }
    onToggleCollapse = (path) => {
      let s = this.state.fileData[path] && this.state.fileData[path].collapsing;
      this.state.fileData[path] = {collapsing: !s};
      this.setState({fileData: this.state.fileData});
    }
    flatten(dir) {
      // ディレクトリ階層を React element の list に変換
      let re = []; //
      let stack = []; // 親ディレクトリの一覧
      let f = d => {
        let path = stack.join("/") + "/" + d.name;
        d.name && re.push(
          <div className={"dir-item"}
            key={path}
            data-filepath={path}
            style={ {
              width: "100%"
            } }
            onClick={(() => {
              if (d.children) {
                this.onToggleCollapse(path);
              } else {
                if (this.props.openFile) this.props.openFile(path);
              }
            }).bind(this)}
          >
            <div className={"dir-label"} draggable>
              <span
                className="dir-label-image"
                style={{
                  marginLeft: stack.length * 1 + "em",
                  backgroundImage: "url(" + (!d.children ? logo : `"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23E8E8E8' d='M11 10H5.344L11 4.414V10z'/%3E%3C/svg%3E"` ) + ")",
                  transform: "rotate(" + (d.children ? this.state.fileData[path] && this.state.fileData[path].collapsing && "-45" || "0" : "0") + "deg)"
                }}
              >
              </span>
              <a className={"dir-label-name"}>
                {d.name}
              </a>
            </div>
          </div>
        );
        if (!d.children || (this.state.fileData[path] && this.state.fileData[path].collapsing) ) return;
        stack.push(d.name);
        for (let v of d.children) {
          f(v);
        }
        stack.pop();
      }
      f(dir);
      return re;
    }
    render() {
      return (
        <div
          className="dir-window"
          style={ {
            width: "100%"
          } }
        >
          {
            this.flatten(this.props.dir)
          }
        </div>
      )
    }
}
  
class Window extends Component {
    constructor(props) {
        super(props);

        this.state ={
        tabs: [
            { name: null },
        ],
        currentTab: null,
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

    openTab(path) {
        let id = this.getTabIndex(path);
        if (id != -1) {
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
            if (path == this.state.currentTab && this.state.tabs.length > 0) {
                let i = tabId > 0 ? tabId - 1 : 0;
                this.activateTab(this.state.tabs[i].path);
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
        if (path == this.state.currentTab) return;

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
        }).bind(this));
        
    }
    moveTab(path, to) {
        let from = this.getTabIndex(path);
        let newTabs = [];

        for (let i in this.state.tabs) {
            if (i == from) { //
                continue;
            }
            let right = (i >= from && i <= to);
            
            if (right) {
                newTabs.push(this.state.tabs[i]);
            }
            if (i == to) {
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
            if (v.path == path) {
                return v;
            }
        }
        return; 
    }
    getTabIndex(path) {
        for (let i in this.state.tabs) {
            if (this.state.tabs[i].path == path) {
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
            }}
        >
            <div
                className="window-tablist"
                style={{
                    flex: "0 0 auto",
                    maxWidth: "100%",
                    textAlign: "left"
                }}
                ref={this.tabList}
            >
            {
                this.state.tabs.map((v, i, ar) => {
                if (!v || !v.name) return;
                return <div
                    key={i}
                    className="window-tab"
                    style={ {
                        backgroundColor: this.state.currentTab == v.path && "rgb(30, 30, 30)" || "rgb(45, 45, 45)",
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
                        className="window-tab-image"
                        style={{
                            backgroundImage: "url(" + logo + ")",
                        }}
                    >
                    </span>
                    {v.name}
                    <span
                        className="window-tab-close"
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
            </div>
            <div
                style={{
                    flex: "1 1 auto",
                    width: "100%",
                    opacity: this.state.currentTab && "1" || "0",
                    overflow: "hidden",
                    background: "linear-gradient(145deg, #00c1da, #003bca)",
                }}
                onClick={this.onClickBackground}
                ref={this.containerRef}
            >
                <div
                    className="window-content"
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
                    position: "absolute",
                    width: "100%",
                    height: "200px",
                    top: "auto",
                    bottom: "0",
                }}
            >
                <Term />
            </div>
        </div>
        );
    }
}
















  
class Mylayout extends Component {
    state = {
        dir: {
          children: [
            {
              name: "src",
              children: [
                {
                  name: "index.js"
                }
              ]
            },
            { name: "app.js" },
            { name: "app1.js" },
            { name: "app2.js" },
            { name: "app3.js" },
          ]
        }
    }
    
    constructor(props) {
        super(props);

        this.window = React.createRef();
    }

    runCode(){
        if (!this.editor) return;

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        // console.log(this.state.value)
        /*
        */

        let text = this.editor.getValue();
        axios.post('/api/python/',{contents: text}).then(response => {
            this.setState({ result: response.data})
            // console.log(response.data)
        }).catch(e => {
            // console.log(e)
        })

    }
    
    render() {
        return (
            <div>

                <div
                    style={{
                    display: "flex",
                    lineHeight: "120%",
                    fontSize: "0.6em",
                    color: "#cccccc",
                    height: "500px",
                    width: "100%",
                    }}
                >
                    <div
                        style={{
                            flex: "0 0 auto",
                            width: "200px",
                            overflow: "hidden auto"
                        }}
                    >
                        <DirTree dir={this.state.dir} openFile={path => {this.window.current.openTab(path);}} />
                    </div>
                    <div
                        style={{
                            flex: "1 1 auto",
                            height: "100%",
                            width: "100%",      
                        }}
                    >
                        <Window ref={this.window} />
                        <button onClick={() => this.runCode()}>実行</button>
                    </div>
                </div>

                <div
                    style={{
                        height: "300px",
                        width: "300px",      
                    }}
                >
                </div>
                <Editor />
            </div>
        )
    }
}

Mylayout.propTypes = {};
export default Mylayout;