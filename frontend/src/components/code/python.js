import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {saveAs} from 'file-saver'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Controlled as CodeMirror} from 'react-codemirror2'
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
    test4: {
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.3
    }, 
  });

class Py extends Component {
    state = {
        value: '',
        open: false,
        filename: '',
        type: '.py',
    };

    constructor(props){
        super(props)
/**
                <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.clicked} small="true">
                    Submit
                </Button>
                <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.handleClickOpen} small="true">
                    Save
                </Button>
 * 
 * 
 */
        this.clicked = this.clicked.bind(this)
        this.savelocal = this.savelocal.bind(this)        
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChanged = this.handleChanged.bind(this)
        this.fixtext = this.fixtext.bind(this)
    }

    componentWillMount(){
    }
    fixtext(editor,data,value){
    }
    clicked(e){
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        // console.log(this.state.value)
        /*
        */
       axios.post('/api/python/',{contents: this.state.value}).then(response => {
           this.setState({value: response.data})
       }).catch(e => {
           // console.log(e)
       })              
        axios.post('/api/code/',{
            code: this.state.value,
            type: 'python'
        }).then(response => {
            console.log(response)
        }).catch(e => {
            // console.log(e)
        })      
   

    }

    handleChanged = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
    handleClickOpen(){
        this.setState({ open: true });
      };
    
    handleClose(){
    this.setState({ open: false });
    };

    savelocal(){
        var blob = new Blob([this.state.value], {type:"text/plain;charset=utf-8"});
        saveAs(blob,this.state.filename + this.state.type)
        this.handleClose()

    }

	render() {
        return (
            <div className={this.props.classes.test4}>
                <CodeMirror
                value={this.state.value}
                options={{
                    //mode: 'xml',
                    //mode: 'text/x-csrc',
                    // mode: 'text/x-java',
                    // mode: 'text/x-c++src',
                    mode: 'text/x-python',
                    theme: 'material',
                    lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                    this.setState({value});
                }}
                onChange={(editor, data, value) => this.fixtext(editor,data,value)}
                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Save</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        please conform your file name.
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="file name"
                        type="text"
                        fullWidth
                        value={this.state.filename}
                        onChange={this.handleChanged('filename')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.savelocal} color="primary">
                        Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
		);
  	}
}

export default withStyles(styles)(Py);
