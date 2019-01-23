import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './CourseInfo.module.css';
import UserPanel from '../UserPanel';
import Rating from '../Rating';

class Courseinfo extends Component {
    state = {
        contents: "",
        info: "",
        currentTab: 0,

        courseData: {
            name: "peeton",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            author: "",
            rating: 3.5,
        },
        chapters: [
            {
                name: "chapter 1",
                desc: "peeton basics"
            }
        ],
        reviews: [
            {
                author: "",
                text: "11/10 would not play again",
                rating: 0,
                date: "2019/01/22 19:45",
            }
        ]
    }

    constructor (props) {
        super(props);

    }
    setTab(id) {
        this.setState({currentTab: id});
    }

    componentDidMount(){
        var u = '/getCourseInfoContentsInfo/' + this.props.match.params.id
        axios.get(u).then(response => {
            this.setState({contents: response.data})
        }).catch(e => console.log(e))
    }


    render() {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles["info-panel"]}>
                        <div className={styles["header-container"]}>
                            <div className={styles["course-name"]}>
                                {this.state.courseData.name}
                            </div>
                            <div className={styles["start-button"]}>
                                初めから / 続きから
                            </div>
                        </div>
                        <div className={styles["middle-container"]}>
                            <div className={styles["rating-container"]}>
                                <Rating value={this.state.courseData.rating}/>
                                <span className={styles.rating}>
                                    {this.state.courseData.rating}
                                </span>
                                <span className={styles["rate-info"]}>
                                    (103 人)
                                </span>
                            </div>
                            <div style={{fontSize: "0.8em"}}>
                                <UserPanel username="Kang the polyglot" desc="I can speak Korean, Japanese and English fluently." avatar=".png" />
                            </div>
                        </div>
                        <div>
                            <div className={styles.description}>
                                {this.state.courseData.desc}
                            </div>
                        </div>
                    </div>
                    <div className={styles["tab-list"]}>
                        <div onClick={() => this.setTab(0)} className={this.state.currentTab == 0 ? styles["tab-onclicked"] : ""}><span>チャプター</span></div>
                        <div onClick={() => this.setTab(1)} className={this.state.currentTab == 1 ? styles["tab-onclicked"] : ""}><span>レビュー</span></div>
                    </div>
                    <div className={styles["tab-content"]}>
                        {
                        this.state.currentTab == 0 ?
                            <div className={styles["chapter-list"]}>
                            {
                                this.state.chapters.map((v, i) => {
                                    return <div key={i}>
                                        <div className={styles["chapter-header"]}>
                                            <div className={styles["chapter-name"]}>
                                                <a>{v.name}</a>
                                            </div>
                                            <div className={styles["chapter-start-button"]}>
                                                開始
                                            </div>
                                        </div>
                                        <div className={styles["chapter-desc"]}>
                                            {v.desc}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        :
                            <div className={styles["review-list"]}>
                            {
                                this.state.reviews.map((v, i) => {
                                    return <div key={i}>
                                        <UserPanel username="Kang the polyglot" desc="I can speak Korean, Japanese and English fluently." avatar=".png" />
                                        <div className={styles["review-text"]}>
                                            11/10 would not play again
                                        </div>
                                        <div className={styles["review-info"]}>
                                            2019/01/22 19:45
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
  	}
}

Courseinfo.propTypes = {};

export default Courseinfo;