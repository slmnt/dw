import React from 'react';   

import ansiEscapes from 'ansi-escapes';

import 'xterm/src/xterm.css';
import './Term.css';
import * as xterm from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
import api from '../modules/api';

let Terminal = xterm.Terminal;
Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

//
const ESC = '\u001B[';
const CU = ESC + 'A';
const CD = ESC + 'B';
const CF = ESC + 'C';
const CB = ESC + 'D';
const DSR = /\u001B\[(.+);(.+)R/;
const CUU = /\u001B\[(.*)A/; // cursor up
const CUD = /\u001B\[(.*)B/; // cursor down
const CUF = /\u001B\[(.*)C/; // cursor right (forward)
const CUB = /\u001B\[(.*)D/; // cursor left (backward)
  
class Term extends React.Component {
    /*
      props
        postInput()
        getOutput() -> writeOutput()
    */
    constructor (props) {
      super(props);
      this.state = {
      }
      this.termElement = null;
    }

    componentWillUnmount() {
      this.term.dispose();
      this.term = null;
    }
    
    termRef = element => {
      if (!element) {
          // unmount
          return;
      }
      this.termElement = element;
      //let rect = element.getBoundingClientRect();
      //element.style.width = rect.width + "px";
      //element.style.height = (this.props.height || rect.height) + "px";

      let term = new xterm.Terminal({
        cursorBlink: true
      });
      this.term = term;
      term.open(element);
      term.winptyCompatInit();
      term.webLinksInit();




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
              background: "#1e1e1e",
              foreground: "#cccccc",
              cursor: "#cccccc",
          }
      };
      for (let k in stringOptions) {
          term.setOption(k, stringOptions[k]);
      }

      //
      
      this.runTerminal(this.term)
      term.fit();
      term.focus();
      term.write2('Hello from \x1B[1;3;31mPresident Kang\x1B[0m');
      term.prompt();
      
      element.style.height = term._core.viewport._viewportElement.getBoundingClientRect().height + "px";
      this.props.onInit(element.style.height);
    }
  
    runTerminal(term) {
      if (term._initialized) {
        return;
      }
    
      term._initialized = true;

      /*
      x, y: 現在の位置
      ix, iy: ユーザ入力の開始
      mx, my: 最先端
      allowInput: ユーザが入力可能かどうか
      */
      term.mx = 0;
      term.my = 0;
      term.promptStr = '$ ';
      term.cmd = '';

      term.insertMode = true;
      term.history = [];
      term.historyIndex = -1;

      term._dsr_clbk = [];
    
      //
      term.prompt = () => {
        term.write2('\r\n' + term.promptStr, () => {
          term.ix = term.x;
          term.iy = term.y;
          //console.log("prompt", term.x, term.y);
          term.allowInput  = true;
        });
      };
      term.addLineBreak = () => {
        term.write2(ansiEscapes.cursorTo(term.mx - 1, term.my - 1));
        //console.log(term.mx, term.my)
        term.write2('\r\n');
      }


      term.pushHistory = (cmd) => {
        term.history.push(cmd);
      }
      term.moveHistory = (value) => {
        if (term.historyIndex == -1)
          term.historyIndex = term.history.length - 1;
        else
          term.historyIndex += value;
        
        if (term.historyIndex < 0) term.historyIndex = 0;
        else if (term.historyIndex >= term.history.length) term.historyIndex = term.history.length - 1;

        const txt = term.history[term.historyIndex];
        if (txt) {
          term.clearCommand();
          term.write2(txt);
          term.cmd = txt;
        }
      }


      term.insertToCommand = (key, n) => {
        let clbk;
        if (key.length == 1) {
          clbk = () => {
            //console.log("insert", key, n, term.x, term.y)
            term.write2(term.cmd.substring(n - 1));
            term.write2(ansiEscapes.cursorTo(term.x - 1, term.y - 1));
            term.cmd = term.cmd.substring(0, n - 1) + (key.length == 1 ? key : "") + term.cmd.substring(n - 1);
          };
        }
        term.write2(key, clbk);
      }
      term.clearCommand = () => {
        if (!term.mx || !term.ix) return;
        term.write2(ansiEscapes.eraseEndLine);
        term.write2(ansiEscapes.cursorNextLine);
        term.write2(ansiEscapes.eraseLines(term.my - term.y));
        term.write2(ansiEscapes.cursorTo(term.ix - 1, term.iy - 1));
      }
      term.setCommand = (text, ox, oy) => {
        term.cmd = text;
        term.write2(ansiEscapes.cursorTo(term.ix, term.iy));
        term.write2(term.cmd);
        if (ox && oy) {
          term.write2(ansiEscapes.cursorTo(ox, term.oy));
        }
      }
      term.runCommand = () => {
        term.addLineBreak();

        this.runCommand(term.cmd);
        
        term.pushHistory(term.cmd);
        term.cmd = '';
        term.historyIndex = -1;

        term.allowInput = false;
      }
      term.isOutOfInput = (rx, ry) => {
        const f = term.x + rx >= term.ix && term.y + ry == term.iy || term.y + ry > term.iy;
        const b = term.x + rx <= term.mx && term.y + ry <= term.my;
        /*
        console.log(term.x + rx, term.y + ry)
        console.log(term.ix, term.iy)
        console.log(term.mx, term.my)
        console.log(f, b)
        */
        return !f || !b;
      }
      term.cmdCharN = (x, y) => {
        let n = 0;
        if (y > term.iy) {
          n += Math.max(0, y - term.y - 1) * term.cols;
          n += term.cols - term.ix;
        } else {
          n += x - term.ix + 1;
        }
        return n;
      }
    
      term.onWrite = (d, clbk) => {
        //console.log("onWrite:", d, clbk)
        term.write(ansiEscapes.cursorGetPosition);
        term._dsr_clbk.push(clbk || true);
      }
      term.write2 = (d, clbk) => {
        term.write(d);
        term.onWrite(d, clbk);
      }

      term.on('data', d => {
        // term.write だけでは呼ばれない
        const m = d.match(DSR);
        if (m) {
          term.x = parseInt(m[2]);
          term.y = parseInt(m[1]);
          //console.log("onwrite dsr: ", term.x, term.y)
          if (term.x > term.mx) term.mx = term.x;
          if (term.y > term.my) term.my = term.y;
          if (term._dsr_clbk) {
            let clbk = term._dsr_clbk.shift();
            if (clbk && typeof(clbk) == 'function') clbk();
          }
        }
      });
      term._core.register(term.addDisposableListener('key', (key, ev) => {
        //console.log(ev.keyCode, ev.ctrlKey)
        if (ev.keyCode === 67 && ev.ctrlKey) {
          term.prompt();
          return;
        }

        if (!term.allowInput) return;
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
                
        if (ev.keyCode === 13) { // enter
          if (term.cmd.trim() === '') {
            term.prompt();
            return;
          }
          term.runCommand();
          term.selectLines(1,2);
        } else if (ev.keyCode === 8) { // backspace
          console.log("ix, iy: ", term.ix, term.iy)
          if (term.x > term.ix && term.y == term.iy || term.y > term.iy) {
            if (term.insertMode) {
              // 一旦クリア
              term.clearCommand();
              // cmd を調整
              let n = term.cmdCharN(term.x, term.y);
              term.cmd = term.cmd.substring(0, n - 2) + term.cmd.substring(n - 1);
              console.log("backspace", term.cmd)
              //console.log(term.cmd);
              // 書き込み
              term.write2(term.cmd);
              term.write2(ansiEscapes.cursorTo(term.x - 2, term.y - 1));
            } else {
              if (term.x == 1) {
                term.write2(ansiEscapes.cursorTo(term.cols + 2, term.y - 2));
                term.write2(' ');
              }
              term.write2('\b \b');
            }
          }
        } else if (printable) {
          //console.log(key)
          if (key == CU && term.isOutOfInput(0, -1)) {
            term.moveHistory(-1);
            return;
          } else if (key == CD && term.isOutOfInput(0, 1)) {
            term.moveHistory(1);
            return;
          } else if (key == CF && term.isOutOfInput(1, 0)) return;
          else if (key == CB && term.isOutOfInput(-1, 0)) return;


          
          if (term.insertMode) {
            let n = term.cmdCharN(term.x, term.y);
            term.insertToCommand(key, n);
          } else {
            term.cmd += key
            term.write2(key);
          }
        }
      }));
    
      term._core.register(term.addDisposableListener('paste', (data, ev) => {
        term.write2(data);
      }));
    }


    updateTerminalSize() {
      if (!this.term) return;
      /*
      const cols = this.term.cols;
      const rows = this.term.rows;
      const width = (cols * this.term._core.renderer.dimensions.actualCellWidth + this.term._core.viewport.scrollBarWidth).toString() + 'px';
      const height = (rows * this.term._core.renderer.dimensions.actualCellHeight).toString() + 'px';
      const terminalContainer = this.termElement;
      terminalContainer.style.width = width;
      terminalContainer.style.height = height;
      console.log(this.termElement)
      */
      //const terminalContainer = this.termElement.parentNode;
      //const rect = terminalContainer.getBoundingClientRect();
      //terminalContainer.style.width = rect.width + "px";
      //terminalContainer.style.height = rect.height + "px";
      this.term.fit();

    }
    
    runCommand(text) {
      console.log("run cmd:", text);
      if (this.props.run) this.props.run(text)
    }
    getOutput(data) {
      this.term.write2(data.replace(/\n/g, '\r\n'));
      this.term.prompt();
    }
    render() {
        return (
          <div
              id="terminal-container"
              style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
              ref={this.termRef}
            >
          </div>
        );
    }
}

export default Term;

