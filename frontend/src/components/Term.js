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
      let rect = element.getBoundingClientRect();
      element.style.width = rect.width + "px";
      element.style.height = (this.props.height || rect.height) + "px";

      let term = new xterm.Terminal({
        cursorBlink: true
      });
      this.term = term;
      term.open(element);
      term.winptyCompatInit();
      term.webLinksInit();
      term.fit();
      term.focus();

      this.runTerminal(this.term)
      term.write('Hello from \x1B[1;3;31mPlayer Monta\x1B[0m');
      term.prompt();


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
      element.style.height = term._core.viewport._viewportElement.getBoundingClientRect().height + "px";
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
    
      //
      term.prompt = () => {
        term.write('\r\n' + term.promptStr);
        term.allowInput = true;
        term._dsr_clbk = () => {
          term.ix = term.x;
          term.iy = term.y;
          //console.log("first", term.x, term.y);
        };
      };
      term.insertToCommand = (key, n) => {
        term.write(key);
        if (key.length == 1) {
          window.setTimeout(() => {
            term.write(term.cmd.substring(n - 1));
            term.write(ansiEscapes.cursorTo(term.x - 1, term.y - 1));
            term.cmd = term.cmd.substring(0, n - 1) + (key.length == 1 ? key : "") + term.cmd.substring(n - 1);
          }, 0);
        }
      }
      term.setComand = (text, ox, oy) => {
        term.cmd = text;
        term.write(ansiEscapes.cursorTo(term.ix, term.iy));
        term.write(term.cmd);
        if (ox && oy) {
          term.write(ansiEscapes.cursorTo(ox, term.oy));
        }
      }
      term.runCommand = () => {
        this.runCommand(term.cmd);
        term.cmd = '';
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
    

      term.on('data', d => {
        const m = d.match(DSR);
        if (m) {
          term.x = parseInt(m[2]);
          term.y = parseInt(m[1]);
          if (term.x > term.mx) term.mx = term.x;
          if (term.y > term.my) term.my = term.y;
          if (term._dsr_clbk) {
            term._dsr_clbk();
            term._dsr_clbk = null;
          }
        } else {
          term.write(ansiEscapes.cursorGetPosition);
        }
      });
      term._core.register(term.addDisposableListener('key', (key, ev) => {
        if (!term.allowInput) return;
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
                
        if (ev.keyCode === 13) { // enter
          term.runCommand();
          term.prompt();
          term.selectLines(1,2);
        } else if (ev.keyCode === 8) { // backspace
          if (term.x > term.ix && term.y == term.iy || term.y > term.iy) {
            if (term.insertMode) {
              let ni = term.cmdCharN(term.ix, term.iy);
              term.write(ansiEscapes.cursorTo(term.ix - 1, term.iy - 1));
              term.write(' '.repeat(term.cmdCharN(term.mx, term.my) - ni + 1));
              term.write(ansiEscapes.cursorTo(term.ix - 1, term.iy - 1));
              
              let n = term.cmdCharN(term.x, term.y);
              term.cmd = term.cmd.substring(0, n - 2) + term.cmd.substring(n - 1);
              console.log(term.cmd);

              term.write(term.cmd);
              term.write(ansiEscapes.cursorTo(term.x - 2, term.y - 1));
            } else {
              if (term.x == 1) {
                term.write(ansiEscapes.cursorTo(term.cols + 2, term.y - 2));
                term.write(' ');
              }
              term.write('\b \b');
            }
          }
        } else if (printable) {
          //console.log(key)
          if (key == CU && term.isOutOfInput(0, -1)) return;
          else if (key == CD && term.isOutOfInput(0, 1)) return;
          else if (key == CF && term.isOutOfInput(1, 0)) return;
          else if (key == CB && term.isOutOfInput(-1, 0)) return;

          
          if (term.insertMode) {
            let n = term.cmdCharN(term.x, term.y);
            term.insertToCommand(key, n);
          } else {
            term.cmd += key
            term.write(key);
          }
        }
      }));
    
      term._core.register(term.addDisposableListener('paste', (data, ev) => {
        term.write(data);
      }));
    }


    updateTerminalSize() {
      const cols = parseInt((document.getElementById(`opt-cols`)).value, 10);
      const rows = parseInt((document.getElementById(`opt-rows`)).value, 10);
      const width = (cols * this.term._core.renderer.dimensions.actualCellWidth + this.term._core.viewport.scrollBarWidth).toString() + 'px';
      const height = (rows * this.term._core.renderer.dimensions.actualCellHeight).toString() + 'px';
      const terminalContainer = document.getElementById('terminal-container');
      terminalContainer.style.width = width;
      terminalContainer.style.height = height;
      this.term.fit();
    }
    
    runCommand(text) {
      console.log("run cmd:", text);
      if (this.props.onRunCmd) this.props.onRunCmd(text);
    }
    getOutput(data) {
      this.term.write(data);
    }
    render() {
        return (
          <div
              style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
              ref={this.termRef}
          ></div>
        );
    }
}

export default Term;

