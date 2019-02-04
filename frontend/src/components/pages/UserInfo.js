import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";


import styles from './UserInfo.module.css';
import { ReactComponent as Logo } from '../../img/logo.svg';

import axios from 'axios';
import api from '../../modules/api';

import Footer from '../Footer';
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
            userinfo: {
                root: "",
                profile: ""
            },
            courses: [
                /*
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 21,
                    createat: "2025/02/31",

                    root: "Kang the greatest",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 21,
                    createat: "2025/02/31",

                    root: "Kang the greatest",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 21,
                    createat: "2025/02/31",

                    root: "Kang the greatest",
                    authorAvatar: "",
                    authorId: 12
                }
                */
            ],
        };
        this.set = props.set

        this.nameCfg = React.createRef();
        this.descCfg = React.createRef();
    }    
    componentDidMount(){

        api.get(`/api/userinfo/?user=${this.props.match.params.id}`).then(api.parseJson)
        .then(response => {
            if (response) this.setState({userinfo: response})
        })

        api.get(`/api/course/?user=${this.props.match.params.id}`).then(api.parseJson)
        .then(response => {
            if (response) this.setState({courses: response.courses})
        })

    }
    getUserData = () => {

    }
    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }
    openSettings = () => {
        this.props.history.push("/mypage/settings");
    }
    closeSettings = () => {
        this.props.history.push("/mypage");
    }

    onSaveProfile = () => {
        api.ex_post('/api/updateuserprofile/',{profile: this.descCfg.current.value}).then(api.parseJson)
        .then(response => this.setState({userinfo: response}))

        this.closeSettings();
    }

    changeSettings = () => {
        const name =  this.nameCfg.current.value;
        const desc =  this.descCfg.current.value;
        // console.log("change setttings: ", name, desc);
    }
    
    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <div className={styles["profile"]}>
                        <div className={styles["avatar"]}>
                            <Logo className={styles["avatar-img"]} />
                        </div>
                        <Switch>
                            <Route path="/mypage/settings" render={() => {
                                return (
                                    <div className={styles["user-info"]}>
                                        <div className={styles["profile-edit-row"]}>
                                            <div>プロフィール: </div>
                                            <textarea className={styles["profile-controls-text"]} ref={this.descCfg}/>
                                        </div>
                                        <div className={styles["profile-controls"]}>
                                            <button className={styles["profile-controls-btn"]} onClick={this.closeSettings}>
                                                キャンセル
                                            </button>
                                            <button className={styles["profile-controls-btn"]} onClick={this.onSaveProfile}>
                                                保存
                                            </button>
                                        </div>
                                    </div>
                                )
                            }} />
                            <Route path="/mypage" render={() => {
                                return (
                                    <React.Fragment>
                                    {
                                        this.state.userinfo &&
                                        <div className={styles["user-info"]}>
                                            <div className={styles["name"]}>
                                                {this.state.userinfo.root}
                                            </div>
                                            <div className={styles["desc"]}>
                                                {this.state.userinfo.profile}
                                            </div>
                                            <div className={styles["misc-info"]}>
                                                国: Democratic Republic of the Awaji
                                            </div>
                                            <div className={styles["profile-controls"]}>
                                                <button className={styles["profile-controls-btn"]} onClick={this.openSettings}>
                                                    編集する
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    </React.Fragment>
                                )
                            }} />
                            <Route render={() => {
                                return (
                                    <React.Fragment>
                                    {
                                        this.state.userinfo &&
                                        <div className={styles["user-info"]}>
                                            <div className={styles["name"]}>
                                                {this.state.userinfo.root}
                                            </div>
                                            <div className={styles["desc"]}>
                                                {this.state.userinfo.profile}
                                            </div>
                                            <div className={styles["misc-info"]}>
                                                国: Democratic Republic of the Awaji
                                            </div>
                                        </div>
                                    }
                                    </React.Fragment>
                                )
                            }} />
                        </Switch>
                    </div>
                    <div className={styles["overview"]}>
                        {/*
                        <div className={styles["overview-title"]}></div>
                        */}
                        <div className={styles["courses"]}>
                            <div className={styles["courses-title"]}>
                                コース一覧
                            </div>
                            <div className={styles["course-container"]}>
                                <CourseList courses={this.state.courses} />
                            </div>
                            {/*
                            <div className={styles["see-all"]}>
                                <Link to="/">全て表示</Link>
                            </div>
                            */}
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        );
  	}
}

UserInfo.propTypes = {};

export default withRouter(UserInfo);