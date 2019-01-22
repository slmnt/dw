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
    }

    constructor (props) {
        super(props);

    }
    setTab(id) {
        this.setState({currentTab: id});
    }

    componentDidMount(){
        var u = '/api/getCourseInfoContentsInfo/' + this.props.match.params.id
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
                                peeton
                            </div>
                            <div className={styles["start-button"]}>
                                初めから / 続きから
                            </div>
                        </div>
                        <div className={styles["middle-container"]}>
                            <div className={styles["rating-container"]}>
                                <Rating value={3.5}/>
                                <span className={styles.rate}>
                                    3.5
                                </span>
                                <span className={styles["rate-info"]}>
                                    (103 人)
                                </span>
                            </div>
                            <UserPanel username="Kang the polyglot" desc="I can speak Korean, Japanese and English fluently." avatar=".png" />
                        </div>
                        <div>
                            <div className={styles.description}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div className={styles["tab-list"]}>
                        <div onClick={() => this.setTab(0)} style={{backgroundColor: this.state.currentTab == 0 ? "firebrick" : "initial"}}><span>チャプター</span></div>
                        <div onClick={() => this.setTab(1)} style={{backgroundColor: this.state.currentTab == 1 ? "firebrick" : "initial"}}><span>レビュー</span></div>
                        <div><span>span3</span></div>
                    </div>
                    <div className={styles["tab-content"]}>
                        {
                        this.state.currentTab == 0 ?
                        <div className={styles["chapter-list"]}>
                            <div>
                                <div className={styles["chapter-header"]}>
                                    <div className={styles["chapter-name"]}>
                                        <a>chapter 1</a>
                                    </div>
                                    <div className={styles["chapter-start-button"]}>
                                        開始
                                    </div>
                                </div>
                                <div className={styles["chapter-desc"]}>
                                    peeton basics
                                </div>
                            </div>
                            <div>
                                <div className={styles["chapter-header"]}>
                                    <div className={styles["chapter-name"]}>
                                        chapter 2
                                    </div>
                                    <div className={styles["chapter-start-button"]}>
                                        開始
                                    </div>
                                </div>
                                <div className={styles["chapter-desc"]}>
                                    peeton basics
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles["review-list"]}>
                            <div>
                                <UserPanel username="Kang the polyglot" desc="I can speak Korean, Japanese and English fluently." avatar=".png" />
                                <div className={styles["review-text"]}>
                                    11/10 would not play again
                                </div>
                                <div className={styles["review-info"]}>
                                    2019/01/22 19:45
                                </div>
                            </div>
                            <div>
                                <UserPanel username="Kang the polyglot" desc="I can speak Korean, Japanese and English fluently." avatar=".png" />
                                <div className={styles["review-text"]}>
                                    11/10 would not play again
                                </div>
                                <div className={styles["review-info"]}>
                                    2019/01/22 19:45
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
  	}
}

Courseinfo.PropTypes = PropTypes;

export default Courseinfo;