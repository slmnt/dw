import React, { Component } from 'react';

// UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//
import classNames from 'classnames';

//
import styles from './Login.module.css';
import {MainContext} from '../../contexts/main';

//
import { ReactComponent as Logo } from '../../img/logo.svg';



const styles2 = theme => ({
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

        document.addEventListener('keypress', this.key, false)
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.key)
    }

    key = (e) => {
        if(e.key === 'Enter'){
            this.onClickLogin()
        }
    }
    onClickLogin = () => {
        this.context.login(this.state.name, this.state.password);
    }
    onClickDrop = () => {
        this.context.drop();
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };    

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };    

	render() {
        return (
            <div className={styles.main}>
            <div className={styles.top_logo}>
              <Logo className={styles.logo_img}/>
              <div className={styles.logo_title}>
                MiniProg
              </div>
            </div>
            
            <div className={styles.create_form}>
              <div className={styles.form_layout}>
                <div className={styles.form_title}>
                  ログイン
                </div>
                <div>
                  <div>
                    <label>ID</label>
                  </div>
                  <div>
                    <input onChange={this.handleChange('name')}></input>
                  </div>
                </div>
                <div>
                  <div>
                    <label>PASSWD</label>
                  </div>
                  <div>
                    <input type="password" onChange={this.handleChange('password')}></input>
                  </div>
                </div>
              <div className={styles.form_btn}>
                <a href="javascript:void(0)" onClick={this.onClickDrop} >キャンセル</a>
                <a href="javascript:void(0)" onClick={this.onClickLogin}>ログイン</a>
              </div>
              </div>
            </div>
            <br/>
            <br/>
          </div>    
        )
        return (
            <div className={styles.main}>
            <Grid container direction="column">
                <Grid container item justify="center" >
                <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        variant="outlined"
                        className={classNames(this.props.classes.margin, this.props.classes.textField)}
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
                        <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.onClickLogin}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.onClickDrop}>
                            Drop
                        </Button>
                    </CardContent>
                </Card>
                </Grid>
                </Grid>
            </Grid>
            </div>
		);
  	}
}
Login.contextType = MainContext;

export default withStyles(styles2)(Login);
