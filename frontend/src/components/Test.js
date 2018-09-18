import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';

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
  
class Test extends Component {

    constructor(props){
        super(props)

        this.state = {
            password: '',
            showPassword: false,    
        }

        this.clicked = this.clicked.bind(this)
    }

    clicked(e){
        console.log(this.state.password)
        this.setState({password: ''})
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
                <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.clicked}>
                    Submit
                </Button>

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
            </div>
		);
  	}
}

export default withStyles(styles)(Test);
