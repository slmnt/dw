import React from 'react';   


import 'xterm/src/xterm.css';
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

export default Term;

