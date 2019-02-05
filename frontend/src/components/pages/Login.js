import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//
import styles from './Login.module.css';
import { processRedirect } from '../../modules/misc';
import { MainContext } from '../../contexts/main';

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
                <div className={styles.form_input_container}>
                  <input className={styles.form_input} placeholder="ID" onChange={this.handleChange('name')}></input>
                  <input className={styles.form_input} placeholder="パスワード" type="password" onChange={this.handleChange('password')}></input>
                  <a className={styles.form_btn} onClick={this.onClickLogin}>ログイン</a>
                  <div className={styles.form_bottom_controls}>
                    <a onClick={() => processRedirect('/')}>キャンセル</a>
                    <Link to="/signup">新規登録</Link>
                  </div>
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
