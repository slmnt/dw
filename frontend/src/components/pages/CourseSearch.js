import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import api from '../../modules/api';
import Loading from '../Loading'
import styles from './CourseSearch.module.css';
import Ad from '../AdPanel'

import { ReactComponent as FavIcon } from '../../img/fav.svg';
import { ReactComponent as SearchIcon } from '../../img/search.svg';


class CourseSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {
            keyword: 'test',
            context: [],
            courses: [
                {
                    title: "course1",
                    desc: "croues1desc",
                    likes: 100000,
                    date: "2025/02/31",

                    author: "Dr. Monta",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    title: "course1",
                    desc: "croues1desc",
                    likes: 100000,
                    date: "2025/02/31",

                    author: "Dr. Monta",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    title: "course1",
                    desc: "croues1desc",
                    likes: 100000,
                    date: "2025/02/31",

                    author: "Dr. Monta",
                    authorAvatar: "",
                    authorId: 12
                }
            ],
        }

        this.langOption = React.createRef();
    }

    componentDidMount(){
        var u = '/getusercourse'
        axios.get(u).then(response => {
            this.setState({
                cours: response.data
            })
        }).catch(e => console.log(e))
    }
    
    handleChange = (event) => {
        this.setState({keyword: event.target.value});
    }

    onSearch = (e) => {
        console.log(this.langOption.current.selectedIndex)
        /*
        api.get();
        */
    }
    
    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["header"]}>
                    <div className={styles["title-container"]}>
                        コース検索
                    </div>
                    <div className={styles["search-container"]}>
                        <span className={styles["search-box-container"]}>
                            <input 
                                onKeyPress={(e) => e.nativeEvent.key === "Enter" && this.onSearch(e)} 
                                className={styles["search-box"]} 
                                value={this.state.keyword} 
                                onChange={this.handleChange}
                                >
                            </input>
                            <span className={styles["search-box-icon"]} onClick={this.onSearch}>
                                <SearchIcon/>
                            </span>
                        </span>
                    </div>
                    <div className={styles["option-container"]}>
                        <select className={styles["search-dropdown"]} ref={this.langOption}>
                            <option value="">--言語--</option>
                            <option value="c">C</option>
                            <option value="cpp">CPP</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                        <select className={styles["search-dropdown"]}>
                            <option value="">--言語--</option>
                            <option value="c">C</option>
                            <option value="cpp">CPP</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                    </div>
                </div>
                
                <div className={styles["container"]}>
                    <div className={styles["ad-container"]}>
                        <Ad/>
                    </div>
                    <div className={styles["course-container"]}>
                        {
                            this.state.courses.map((v, i) => {
                                return (
                                    <div key={i} className={styles["course-item"]}>
                                        <div className={styles["course-item-score"]}>
                                            <div><FavIcon /></div>
                                            <div>{v.likes}</div>
                                        </div>
                                        <div className={styles["course-item-main"]}>
                                            <div className={styles["course-item-top"]}>
                                                <Link to={"/course/" + this.state.id} className={styles["course-item-title"]}>
                                                    {v.title}
                                                </Link>
                                                <Link to={"/user/" + v.authorId} className={styles["course-item-user"]}>
                                                    <span className={styles["course-item-user-avatar"]}>
                                                        <img src={v.authorAvatar}></img>
                                                    </span>
                                                    <span className={styles["course-item-user-name"]}>
                                                        {v.author}
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className={styles["course-item-bottom"]}>
                                                <div className={styles["course-item-desc"]}>
                                                    {v.desc}
                                                </div>
                                                <div className={styles["course-item-date"]}>
                                                    {v.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
  	}
}

CourseSearch.propTypes = {};

export default CourseSearch;