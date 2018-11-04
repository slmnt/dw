import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {saveAs} from 'file-saver'
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  test: {
    backgroundColor: 'red'
  }
});

class Result extends React.Component {
    state = {
        open: false,
        filename: '',
        type: '.py',
        result: ''
    };


  constructor(props){
    super(props)

    this.get = props.get
    this.onClick = this.onClick.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChanged = this.handleChanged.bind(this)
    this.savelocal = this.savelocal.bind(this)
  }
  
    onClick(){
      var dump = this.get()
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      // console.log(this.state.value)
      /*
      */
     axios.post('/api/python/',{contents: dump}).then(response => {
        this.setState({ result: response.data})
        console.log(response.data)
     }).catch(e => {
         // console.log(e)
     })              
      axios.post('/api/code/',{
          code: dump,
          type: 'python'
      }).then(response => {
          console.log(response)
      }).catch(e => {
          // console.log(e)
      })      

    }
     
    handleClickOpen(){
        this.setState({ open: true });
    };
    
    handleClose(){
    this.setState({ open: false });
    };

    handleChanged = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };


    savelocal(){
        var blob = new Blob([this.get()], {type:"text/plain;charset=utf-8"});
        saveAs(blob,this.state.filename + this.state.type)
        this.handleClose()
    }

    
    render() {
    return (
      <div>
        <TextField
        disabled
        multiline
        id="outlined-disabled"
        value={this.state.result}
        variant="outlined"
        />
        <br/>
        <Button onClick={e => this.onClick()}>submit</Button>
        <Button onClick={e => this.handleClickOpen()}>save</Button>
        <Dialog
            disable
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
                Save
                </Button>
            </DialogActions>
        </Dialog>

      </div>
    );
  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Result);
