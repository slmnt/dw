import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import api from '../../modules/api';
import Loading from '../Loading'
import CourseList from '../CourseList';
import Ad from '../AdPanel'
import styles from './CourseSearch.module.css';

import { ReactComponent as SearchIcon } from '../../img/search.svg';


class CourseSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {
            keyword: 'test',
            context: [],
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
                    <CourseList courses={this.state.courses} />
                </div>
            </div>
        );
  	}
}

CourseSearch.propTypes = {};

export default CourseSearch;