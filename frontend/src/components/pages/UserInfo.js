import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import styles from './UserInfo.module.css';
import { ReactComponent as Logo } from '../../img/logo.svg';

import axios from 'axios';
import api from '../../modules/api';

import CourseList from '../CourseList';


class UserInfo extends Component {
    /*
    props
        isMypage
    */
    constructor(props){
        super(props)

        this.state = {
            userId: this.props.isMyPage || !this.props.match ? -1 : this.props.match.params.id,
            userinfo: {},
            courses: [
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 21,
                    date: "2025/02/31",

                    author: "Kang the greatest",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 21,
                    date: "2025/02/31",

                    author: "Kang the greatest",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 21,
                    date: "2025/02/31",

                    author: "Kang the greatest",
                    authorAvatar: "",
                    authorId: 12
                }
            ],
        };
        this.set = props.set
    }
    componentDidMount(){

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
                            <div className={styles["misc-info"]}>
                                国: Democratic Republic of the Awaji
                            </div>
                            {
                                this.state.isMyPage &&
                                <div className={styles["profile-controls"]}>
                                    <button className={styles["profile-controls-editbtn"]}>
                                        編集する
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles["overview"]}>
                        <div className={styles["overview-title"]}>/</div>
                        <div className={styles["courses"]}>
                            <div className={styles["courses-title"]}>コース一覧</div>
                            <CourseList courses={this.state.courses} />
                            <div className={styles["see-all"]}>
                                <Link to="/">全て表示</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
  	}
}

UserInfo.propTypes = {};

export default UserInfo;