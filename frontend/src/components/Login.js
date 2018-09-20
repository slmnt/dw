import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import axios from 'axios';

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
  
class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            password: '',
            name: '',
            showPassword: false,    
        }

        this.clicked = this.clicked.bind(this)
        this.drop = this.drop.bind(this)

        document.addEventListener('keypress', this.key, false)
    }

    key(e){
        if(e.key === 'Enter'){
            this.clicked('test')
        }
    }
    clicked(){
        //console.log(this.state.password)
        // send allowed true reject false
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        
        axios.post('/api/authentic/',{
            uid: this.state.name,
            pwd: this.state.password
            }).then(response => {
            console.log(response)
            this.props.test({
                login: true,
                uid: this.state.name
            })
          }).catch(e => {
            // console.log(e)
          })              
    }
    drop(){
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.post('/api/dropliveuser/',{
            uid: this.state.name,
            }).then(response => {
            console.log(response)
            this.props.test(false)
          }).catch(e => {
            // console.log(e)
          })              

    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };    

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };    

	render() {
        return (
            <div>
                <TextField
                id="standard-name"
                label="Name"
                className={this.props.classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                />
                <TextField
                id="outlined-adornment-password"
                className={classNames(this.props.classes.margin, this.props.classes.textField)}
                variant="outlined"
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
                <br/>
                <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.clicked}>
                    Submit
                </Button>
                <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.drop}>
                    Drop
                </Button>

            </div>
		);
  	}
}

export default withStyles(styles)(Login);
