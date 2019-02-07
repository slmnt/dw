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

            <div className={styles.form_input_container}>
              <input className={styles.form_input} placeholder="ID" type="text" value={this.state.username} onChange={this.handleChange('username')}></input>
              <input className={styles.form_input} placeholder="メールアドレス" type="email" value={this.state.email} onChange={this.handleChange('email')}></input>
              <input className={styles.form_input} style={{marginTop: "1.5em"}} placeholder="パスワード" type="password" value={this.state.passwd} onChange={this.handleChange('passwd')}></input>
              <input className={styles.form_input} placeholder="パスワード (再入力)" type="password" value={this.state.passwd2} onChange={this.handleChange('passwd2')}></input>
              <a className={styles.form_btn} onClick={this.submit}>ユーザ登録</a>
              <div className={styles.form_bottom_controls}>
                <a onClick={(e) => this.goBack()}>キャンセル</a>
              </div>
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