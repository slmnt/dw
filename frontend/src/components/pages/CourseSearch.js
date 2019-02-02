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

import { ReactComponent as SearchIcon } from '../../img/search.svg';

class CourseSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {
            keyword: '',
            page: 1,
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
        var u = '/course/'
        axios.get(u).then(response => {
            this.setState({
                courses: response.data
            })
        }).catch(e => console.log(e))
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
    
        /*
        api.get();
        */
    }


    clampPage = (v) => {
        return Math.max(1, v);
    }
    goToPage = (v) => {
        this.setState({page: this.clampPage(v)});
    }
    addToPage = (v) => {
        this.setState({page: this.clampPage(this.state.page + v)});
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
                    <Pagination first={1} last={10} maxButtons={5} currentPage={this.state.page}
                        onClickPrev={() => this.addToPage(-1)}
                        onClickNext={() => this.addToPage(1)}
                        onClickFirst={() => this.goToPage(1)}
                        onClickLast={() => this.goToPage(10)}
                        onClickPage={(i) => this.goToPage(i)}
                    />
                </div>
            </div>
        );
  	}
}

CourseSearch.propTypes = {};

export default CourseSearch;