import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import './Mylayout.css'

import axios from 'axios';
/*
import 'brace/mode/python';
import 'brace/mode/java'
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
*/


import TextEditor from './TextEditor';
import DirTree from './DirTree';

import { Z_BLOCK } from 'zlib';

  
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
                        <TextEditor ref={this.window} />
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
            </div>
        )
    }
}

Mylayout.propTypes = {};
export default Mylayout;