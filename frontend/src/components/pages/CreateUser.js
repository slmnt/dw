import React, { Component } from 'react';   
import PropTypes from 'prop-types';

import api from '../../modules/api'
import Loading from '../Loading'

import styles from './CreateUser.module.css';
import {MainContext} from '../../contexts/main';

import { ReactComponent as Logo } from '../../img/logo.svg';

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


    this.genInput = React.createRef();
    this.birthInput = React.createRef();

  }

  checkpasswd = () => {
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

  convertAge(user_age){
    let now = new Date()
    now = now.getFullYear() + ((now.getMonth() + 1) / 12) + (now.getDay() / 30)
    let ages = new Date(user_age)
    ages = ages.getFullYear() + ((ages.getMonth() + 1) / 12) + (ages.getDay() / 30)

    return parseInt(now - ages)
  }

  submit = (e) => {    
    e.preventDefault()
    // console.log(this.state)
    //api/createuser/
    // 'uid' 'pwd' 'email' 'fname' 'lname
    const data = {
      uid: this.state.username,
      pwd: this.state.passwd,
      email: this.state.email,
      fname: this.state.firstname,
      lname: this.state.lastname,
      gen: '',
      birth: '',
    }
    this.context.createUser(data);

  }

  goBack = (e) => {
    if(window.confirm('本当にキャンセルしますか？')){
      this.props.history.goBack()
    }
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })

    if(name === "passwd2" || name === "passwd")
      this.setState({load: true})
  };

  render() {

    if(this.state.load)
      this.checkpasswd()

    return (
      <div className={styles.main}>
        <div className={styles.top_logo}>
          <Logo className={styles.logo_img}/>
          <div className={styles.logo_title}>
            MiniProg
          </div>
        </div>

        <form className={styles.create_form} name="Create" onSubmit={this.submit}>
          <div className={styles.form_layout}>
            <div className={styles.form_title}>
              会員登録
            </div>
            <div>
              <div>
                <label>ID</label>
              </div>
              <div>
                <input onChange={this.handleChange('username')} value={this.state.username} type="text"></input>
              </div>
            </div>
            <div>
              <div>
                <label>Email</label>
              </div>
              <div>
                <input onChange={this.handleChange('email')} value={this.state.email} type="email"></input>
              </div>
            </div>
            <div>
              <div>
                <label>パスワード</label>
              </div>
              <div>
                <input onChange={this.handleChange('passwd')} value={this.state.passwd} type="password"></input>
              </div>
            </div>
            <div>
              <div>
                <label>パスワード再入力</label>
              </div>
              <div>
                <input onChange={this.handleChange('passwd2')} value={this.state.passwd2} type="password"></input>
              </div>
            </div>
          <div className={styles.form_btn}>
            <a className={styles.form_cancel} href="javascript:void(0)" onClick={(e) => this.goBack()} >キャンセル</a>
            <a href="javascript:void(0)" onClick={this.submit} >登録</a>
          </div>
          </div>
        </form>
        <br/>
        <br/>
      </div>
    );
  }
}

SignIn.propTypes = {};
SignIn.contextType = MainContext;

export default SignIn;