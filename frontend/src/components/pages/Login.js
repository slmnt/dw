import React, { Component } from 'react';

//
import styles from './Login.module.css';
import {MainContext} from '../../contexts/main';

//
import { ReactComponent as Logo } from '../../img/logo.svg';
  
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
                    <label>ユーザ名</label>
                  </div>
                  <div>
                    <input onChange={this.handleChange('name')}></input>
                  </div>
                </div>
                <div>
                  <div>
                    <label>パスワード</label>
                  </div>
                  <div>
                    <input type="password" onChange={this.handleChange('password')}></input>
                  </div>
                </div>
              <div className={styles.form_btn}>
                <a className={styles.form_cancel} href="javascript:void(0)" onClick={this.onClickDrop} >キャンセル</a>
                <a href="javascript:void(0)" onClick={this.onClickLogin}>ログイン</a>
              </div>
              </div>
            </div>
            <br/>
            <br/>
          </div>    
        );
  	}
}
Login.contextType = MainContext;

export default Login;
