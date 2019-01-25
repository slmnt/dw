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

        <form className={styles.create_form} name="Create">
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
                <label>PASSWD</label>
              </div>
              <div>
                <input onChange={this.handleChange('passwd')} value={this.state.passwd} type="password"></input>
              </div>
            </div>
            <div>
              <div>
                <label>PASSWD</label>
              </div>
              <div>
                <input onChange={this.handleChange('passwd2')} value={this.state.passwd2} type="password"></input>
              </div>
            </div>
            <div>
              <div>
                <label>First_Name</label>
              </div>
              <div>
                <input onChange={this.handleChange('firstname')} value={this.state.firstname} type="text"></input>
              </div>
            </div>
            <div>
              <div>
                <label>Last_Name</label>
              </div>
              <div>
                <input onChange={this.handleChange('lastname')} value={this.state.lastname} type="text"></input>
              </div>
            </div>
            <div>
              <div>
                <label>性別</label>
              </div>
              <div>
                <select id="gender" >
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
                <input id="age" type="date"></input>
              </div>
            </div>
          <div className={styles.form_btn}>
            <a className={styles.form_cancel} href="javascript:void(0)" onClick={(e) => this.goBack()} >キャンセル</a>
            <a href="javascript:void(0)" onClick={(e) => this.submit(e)} >登録</a>
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