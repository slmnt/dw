import React from 'react';   


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

      this.runFakeTerminal(this.term)
      term.write('Hello from \x1B[1;3;31mがんくん the polyglot\x1B[0m $ ');
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
  
    runFakeTerminal(term) {
      if (term._initialized) {
        return;
      }
    
      term._initialized = true;
    
      term.prompt = () => {
        term.write('\r\n$ ');
      };
    
      term._core.register(term.addDisposableListener('key', (key, ev) => {
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
        
        console.log(term)
        console.log(term._core)
        console.log(ev.keyCode, ev);
        console.log(term.x, term.y);
        if (ev.keyCode === 13) { // enter
          term.prompt();
        } else if (ev.keyCode === 8) { // backspace
         // Do not delete the prompt
          if (term.x > 2) {
          }
          term.write('\b \b');
        } else if (printable) {
          term.write(key);
        }
      }));
    
      term._core.register(term.addDisposableListener('paste', (data, ev) => {
        term.write(data);
      }));
    }

    resize() {
      this.term.resize();
      this.term.fit();
      console.log("ressss")
    }
    
    runCommand(text) {

    }
    getOutput(text) {

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

