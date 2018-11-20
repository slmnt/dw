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
import { Scrollbars } from 'react-custom-scrollbars';

const styles = theme => ({
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
      password: '',
      email: '',
      firstname: '',
      lastname: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.showparam = this.showparam.bind(this)
    this.submit = this.submit.bind(this)

    document.addEventListener('submit',(e) => this.submit(e))
  }

  submit(e){    
    console.log("clicked")
    e.preventDefault()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  showparam(){
    console.log(this.state)

    return false
  }

  componentWillUnmount(){
    document.removeEventListener('submit', (e) => this.submit(e))
  }

  render() {

    const { classes } = this.props;

    return (
      <Scrollbars style={{ width: window.innerWidth, height: window.innerHeight }}>
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
            <Input name="password" type="password" id="password" autoComplete="new-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">パスワード確認</InputLabel>
            <Input name="password" type="password" id="password_c" autoComplete="new-password" />
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
    </Scrollbars>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);