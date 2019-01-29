import React, { Component } from 'react';   
import { Link } from 'react-router-dom';

import styles from './CourseList.module.css';

import axios from 'axios';
import api from '../modules/api';

import { ReactComponent as FavIcon } from '../img/fav.svg';

class CourseList extends Component {
    constructor(props){
        super(props)

        this.state = {
        };
    }
    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }
    
    render() {
        return (
          <div className={styles["course-container"]}>
            {
                this.props.courses.map((v, i) => {
                    return (
                        <div key={i} className={styles["course-item"]}>
                            <div className={styles["course-item-score"]}>
                                <div><FavIcon /></div>
                                <div>{v.likes}</div>
                            </div>
                            <div className={styles["course-item-main"]}>
                                <div className={styles["course-item-top"]}>
                                    <Link to={"/course/" + v.id} className={styles["course-item-title"]}>
                                        {v.title}
                                    </Link>
                                    <Link to={"/user/" + v.authorId} className={styles["course-item-user"]}>
                                        <span className={styles["course-item-user-avatar"]}>
                                            <img src={v.authorAvatar}></img>
                                        </span>
                                        <span className={styles["course-item-user-name"]}>
                                            {v.root}
                                        </span>
                                    </Link>
                                </div>
                                <div className={styles["course-item-bottom"]}>
                                    <div className={styles["course-item-desc"]}>
                                        {v.desc}
                                    </div>
                                    <div className={styles["course-item-date"]}>
                                        {this.convertdata(v.createat)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
          </div>
        );
  	}
}

export default CourseList;