import React, { Component } from 'react';   
import PropTypes from 'prop-types';

import axios from 'axios';
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

  componentWillUnmount(){
    document.removeEventListener('submit', (e) => this.submit(e))
  }

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

        <div className={styles.create_form}>
          <div className={styles.form_layout}>
            <div className={styles.form_title}>
              会員登録
            </div>
            <div>
              <div>
                <label>ID</label>
              </div>
              <div>
                <input></input>
              </div>
            </div>
            <div>
              <div>
                <label>Email</label>
              </div>
              <div>
                <input></input>
              </div>
            </div>
            <div>
              <div>
                <label>PASSWD</label>
              </div>
              <div>
                <input type="password"></input>
              </div>
            </div>
            <div>
              <div>
                <label>PASSWD</label>
              </div>
              <div>
                <input type="password"></input>
              </div>
            </div>
            <div>
              <div>
                <label>First_Name</label>
              </div>
              <div>
                <input></input>
              </div>
            </div>
            <div>
              <div>
                <label>Last_Name</label>
              </div>
              <div>
                <input></input>
              </div>
            </div>
            <div>
              <div>
                <label>性別</label>
              </div>
              <div>
                <select>
                  <option>---</option>
                  <option>男性</option>
                  <option>女性</option>
                  <option>わからない</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <label>年齢</label>
              </div>
              <div>
                <input type="date"></input>
              </div>
            </div>
          <div className={styles.form_btn}>
            <a href="javascript:void(0)" >登録</a>
            <a href="javascript:void(0)" onClick={(e) => this.goBack()} >キャンセル</a>
          </div>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

SignIn.propTypes = {};
SignIn.contextType = MainContext;

export default SignIn;