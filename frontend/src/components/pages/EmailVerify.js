import React, { Component } from 'react';   
import PropTypes from 'prop-types';

import api from '../../modules/api';

import Footer from '../Footer';

import styles from './EmailVerify.module.css';
import { ReactComponent as CheckIcon } from '../../img/check.svg';

class EmailVerify extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag: false
        };
    }

    componentDidMount(){
        api.post('/checkmail/', {
            code: this.props.match.params['code']
        }).then(response => {
            console.log(response)
            //this.props.history.push('/mypage')
            //checked ok mail, goto mypage
        }).catch(e => {
            //Dont checked mail, print BLOCK page
            this.setState({flag: true})
        })
    }

    render() {
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <span>メールアドレスの確認</span>
                    <div className={styles.text}>
                        <CheckIcon className={styles.icon}/>
                        <span>確認完了</span>
                    </div>
                    {
                        this.state.flag && 
                        <div>エラー</div>
                    }
                </div>
                <div className={styles.content}>
                </div>
                <Footer />
            </div>
        );
  	}
}

EmailVerify.propTypes = {};

export default EmailVerify;
