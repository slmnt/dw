import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import styles from './CourseSearch.module.css';
import api from '../../modules/api';

import Loading from '../Loading'
import CourseList from '../CourseList';
import Ad from '../AdPanel'
import Pagination from '../Pagination';
import {MainContext} from '../../contexts/main';


import { ReactComponent as SearchIcon } from '../../img/search.svg';

class CourseSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {
            keyword: '',
            page: 1,
            totalPages: 1,
            pageSize: 10,
            
            context: [],
            courses: [
                /*
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 100000,
                    date: "2025/02/31",

                    author: "Dr. Monta",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 100000,
                    date: "2025/02/31",

                    author: "Dr. Monta",
                    authorAvatar: "",
                    authorId: 12
                },
                {
                    id: 1,
                    title: "course1",
                    desc: "croues1desc",
                    likes: 100000,
                    date: "2025/02/31",

                    author: "Dr. Monta",
                    authorAvatar: "",
                    authorId: 12
                }
                */
            ],
        }

        this.langOption = React.createRef();
    }

    componentDidMount(){
        this.goToPage(1);
    }
    
    handleChange = (event) => {
        this.setState({keyword: event.target.value});

    }

    onSearch = (e) => {

        let path = '/api/searchcourse/' + this.state.keyword
        api.get(path).then(api.parseJson)
        .then(response => this.setState({
            courses: response
        })).catch()
    }

    clampPage = (v) => {
        return Math.max(1, v);
    }
    goToPage = (v) => {
        const page = this.clampPage(v);

        api.get(`/api/course/?p=${page}&s=${this.state.pageSize}`).then(api.parseJson)
        .then(response => {
            if (!response) return;
            if (response.courses.length === 0) {
                this.setState({
                    totalPages: response.pages
                });
                return;
            }
            this.setState({
                totalPages: response.pages,
                courses: response.courses,
                page: page,
            })    
        })
    }
    addToPage = (v) => {
        this.goToPage(this.state.page + v)
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
                                placeholder="..."
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
                </div>
                
                <div className={styles["container"]}>
                    {/*
                    <div className={styles["ad-container"]}>
                        <Ad/>
                    </div>
                    */}
                    <CourseList courses={this.state.courses} />
                </div>
                <div className={styles["pagination-container"]}>
                    <Pagination first={1} last={this.state.totalPages} maxButtons={5} currentPage={this.state.page}
                        onClickPrev={() => this.addToPage(-1)}
                        onClickNext={() => this.addToPage(1)}
                        onClickFirst={() => this.goToPage(1)}
                        onClickLast={() => this.goToPage(this.state.totalPages)}
                        onClickPage={(i) => this.goToPage(i)}
                    />
                </div>
            </div>
        );
  	}
}

CourseSearch.contextType = MainContext;
export default CourseSearch;