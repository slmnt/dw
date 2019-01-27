import React, { Component } from 'react';   
import PropTypes from 'prop-types';

import styles from './UserInfo.module.css';
import { ReactComponent as Logo } from '../../img/logo.svg';

import axios from 'axios';
import api from '../../modules/api';

class UserInfo extends Component {
    /*
    props
        isMypage
    */
    constructor(props){
        super(props)

        this.state = {
            userinfo: {}
        };
        this.set = props.set
    }
    componentDidMount(){
        console.log(this.props.match)

        axios.get('/user/').then(response => {
            this.setState({userinfo: response.data})
        }).catch((e) => {
            //this.props.history.push('login')
        })        

        axios.post('/test',{
            id:2,
            cid:1,
            context: "test"
        }).then(response => {
            console.log(response)
        }).catch((e) => {
            console.log(e)
        })        

    }
    getUserData = () => {

    }
    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }
    
    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <div className={styles["profile"]}>
                        <div className={styles["avatar"]}>
                            <Logo className={styles["avatar-img"]} />
                        </div>
                        <div className={styles["user-info"]}>
                            <div className={styles["name"]}>
                                name
                            </div>
                            <div className={styles["desc"]}>
                                desc wda dwa dwa wa dw adw a dwa aw w aw a
                            </div>
                        </div>
                    </div>
                    <div className={styles["overview"]}>
                        <div>overview</div>
                        <div className={styles["courses"]}>
                            <div>コース一覧</div>
                        </div>
                    </div>
                </div>
            </div>
        );
  	}
}

UserInfo.propTypes = {};

export default UserInfo;