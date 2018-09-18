import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/lib/codemirror.js');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python')
require('codemirror/mode/clike/clike')

class Top extends Component {
    state = {
        value: ''
    };

	render() {
        return (
            <div>
                <TablePagination></TablePagination>
                <br/>
                <br/>
                <CodeMirror
                value={this.state.value}
                options={{
                    //mode: 'xml',
                    //mode: 'text/x-csrc',
                    // mode: 'text/x-java',
                    // mode: 'text/x-c++src',
                     mode: 'text/x-python',
                    theme: 'material',
                    lineNumbers: true
                }}

                onBeforeChange={(editor, data, value) => {
                    this.setState({value});
                }}
                onChange={(editor, data, value) => {
                }}
                />



            </div>
		);
  	}
}

export default Top;
