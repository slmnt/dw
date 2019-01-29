import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";


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
            ],
        };
        this.set = props.set

        this.nameCfg = React.createRef();
        this.descCfg = React.createRef();
    }
    componentDidMount(){

        axios.get('/user/').then(response => {
            //console.log(response.data)
            this.setState({userinfo: response.data})
        }).catch((e) => {
            //this.props.history.push('login')
        })
          
        if(this.props.match.params.id === "undefined"){
        }else{
                axios.post('/getusercourseinfo/',{
                    name: this.props.match.params.id
                }).then(response => {
                    this.setState({
                        courses: response.data
                    })
                }).catch((e) => {
                    //this.props.history.push('login')
                })
        }


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

    changeSettings = () => {
        const name =  this.nameCfg.current.value;
        const desc =  this.descCfg.current.value;
        console.log("change setttings: ", name, desc);
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
                                            <span>名前: </span>
                                            <input type="text" className={styles["profile-controls-text"]} ref={this.nameCfg}/>
                                        </div>
                                        <div className={styles["profile-edit-row"]}>
                                            <span>説明: </span>
                                            <textarea className={styles["profile-controls-text"]} ref={this.descCfg}/>
                                        </div>
                                        <div className={styles["profile-controls"]}>
                                            <button className={styles["profile-controls-btn"]} onClick={this.closeSettings}>
                                                キャンセル
                                            </button>
                                            <button className={styles["profile-controls-btn"]} onClick={this.closeSettings}>
                                                保存
                                            </button>
                                        </div>
                                    </div>
                                )
                            }} />
                            <Route path="/mypage" render={() => {
                                return (
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
                                        <div className={styles["profile-controls"]}>
                                            <button className={styles["profile-controls-btn"]} onClick={this.openSettings}>
                                                編集する
                                            </button>
                                        </div>
                                    </div>
                                )
                            }} />
                            <Route render={() => {
                                return (
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
                                    </div>
                                )
                            }} />
                        </Switch>
                    </div>
                    <div className={styles["overview"]}>
                        {/*
                        <div className={styles["overview-title"]}></div>
                        */}
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

export default withRouter(UserInfo);