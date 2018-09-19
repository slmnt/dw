import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/lib/codemirror.js');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python')
require('codemirror/mode/clike/clike')

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    margin: {
        margin: theme.spacing.unit,
      },
      textField: {
        flexBasis: 280,
      },    
  });


class Top extends Component {
    state = {
        value: ''
    };

    constructor(props){
        super(props)

        this.clicked = this.clicked.bind(this)
    }

    clicked(e){
        // console.log(this.state.value)
        axios.post('/api/python/',{contents: this.state.value}).then(response => {
            console.log(response)
            this.setState({value: response.data})
          }).catch(e => {
            // console.log(e)
          })
      
    }

	render() {
        return (
            <div>
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
                <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.clicked} small="true">
                    Submit
                </Button>
            </div>
		);
  	}
}

export default withStyles(styles)(Top);
