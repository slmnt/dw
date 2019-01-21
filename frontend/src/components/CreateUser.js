import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios';
import Loading from './Loading'

import styles from './CreateUser.module.css';
import {MainContext} from '../contexts/main';


const styles2 = theme => ({
  main: {
    fontFamily:"arial black,Yu Gothic",
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    backgroundColor:"#f2f7ff",
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  signup:{
    color:"white",
    backgroundColor:"#1abc9c",
    width:"100%",
    textAlign:"center",
    padding:"5px",
    fontSize: 20,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor:"#1abc9c",
  },
});


class SignIn extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      passwd: '',
      passwd2: '',
      email: '',
      firstname: '',
      lastname: '',
      flag: false,
      load: false
    }

    this.submit = this.submit.bind(this)
    this.checkpasswd = this.checkpasswd.bind(this)
    this.handleChange = this.handleChange.bind(this)

    document.addEventListener('submit',(e) => this.submit(e))
  }

  checkpasswd(){
    var tar1 = this.state.passwd
    var tar2 = this.state.passwd2
    if(tar1 !== tar2)
      this.setState({
        flag: true
      })
    else
      this.setState({
        flag: false
      })

    this.setState({
      load: false
    })
  }

  submit(e){    
    e.preventDefault()
    console.log(this.state)
    //api/createuser/
    // 'uid' 'pwd' 'email' 'fname' 'lname

    this.context.createUser({
      uid: this.state.username,
      pwd: this.state.passwd,
      email: this.state.email,
      fname: this.state.firstname,
      lname: this.state.lastname
    });
  }

  handleChange = name => event => {

    this.setState({
      [name]: event.target.value
    })

    if(name === "passwd2" || name === "passwd")
      this.setState({load: true})
  };

  componentWillUnmount(){
    document.removeEventListener('submit', (e) => this.submit(e))
  }

  render() {
    const { classes } = this.props;

    if(this.state.load)
      this.checkpasswd()

    return (
      <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h2" className={classes.signup}>
          Mini Prog 会員登録
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="id">ID(半角英数字)</InputLabel>
            <Input 
            name="id" type="text" id="id" autoComplete="username" 
            autoFocus
            value={this.state.username} 
            onChange={this.handleChange('username')}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">パスワード</InputLabel>
            <Input value={this.state.passwd} onChange={this.handleChange('passwd')} name="password" type="password" id="password" autoComplete="new-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">パスワード確認</InputLabel>
            <Input 
              value={this.state.passwd2}
              onChange={this.handleChange('passwd2')}
              name="password" 
              type="password" 
              id="password_c" 
              autoComplete="new-password" 
              error={this.state.flag}
              />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">メールアドレス</InputLabel>
            <Input id="email" name="email" autoComplete="email" 
            value={this.state.email}
            onChange={this.handleChange('email')} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="first">名(例:太郎)</InputLabel>
            <Input name="first" type="text" id="first" 
            autoComplete="given-name" value={this.state.firstname}
            onChange={this.handleChange('firstname')}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="last">性(例:山田)</InputLabel>
            <Input name="last" type="text" id="last" 
            autoComplete="family-name" value={this.state.lastname}
            onChange={this.handleChange('lastname')}/>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
          >
            登録
          </Button>
        </form>
      </Paper>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
SignIn.contextType = MainContext;

export default withStyles(styles2)(SignIn);