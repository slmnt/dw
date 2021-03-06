import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';


import api from '../../modules/api';
import styles from './UserSearch.module.css';
import {MainContext} from '../../contexts/main';

import Loading from '../Loading';
import Ad from '../AdPanel';
import Pagination from '../Pagination';

import { ReactComponent as FavIcon } from '../../img/fav.svg';
import { ReactComponent as SearchIcon } from '../../img/search.svg';


class UserSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {
            keyword: '',
            page: 1,
            totalPages: 1,
            pageSize: 10,
            
            context: [],
            users: [
                /*
                {
                    root: "Dr. MOnta",
                    profile: "croues1desc",
                    subscribed: 21,
                    avatar: "",
                    id: 12
                },
                {
                    root: "Kang the greatest",
                    profile: "croues1desc",
                    subscribed: 21,
                    avatar: "",
                    id: 12
                },
                {
                    root: "Kang the greatest",
                    profile: "croues1desc",
                    subscribed: 21,
                    avatar: "",
                    id: 12
                },
                */
            ],
        }

        this.langOption = React.createRef();
    }
    //this.context.getpage('course_len')

    componentDidMount(){
        this.goToPage(1);      
    }
    
    handleChange = (event) => {
        this.setState({keyword: event.target.value});
    }

    onSearch = (e) => {
       let path = '/api/searchuser/' + this.state.keyword
       api.get(path).then(api.parseJson)
       .then(response => this.setState({users: response})).catch()
    }

    clampPage = (v) => {
        return Math.max(1, v);
    }
    goToPage = (v) => {
        const page = this.clampPage(v);

        api.get(`/api/getuser/?p=${page}&s=${this.state.pageSize}`).then(api.parseJson)
        .then(response => {
            if (!response) return;
            if (response.users.length === 0) {
                this.setState({
                    totalPages: response.pages
                });
                return;
            }
            this.setState({
                totalPages: response.pages,
                users: response.users,
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
                        ユーザ検索
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
                    <div className={styles["option-container"]}>
                    </div>
                </div>
                
                <div className={styles["container"]}>
                    {/*
                    <div className={styles["ad-container"]}>
                        <Ad/>
                    </div>
                    */}
                    <div className={styles["course-container"]}>
                        {
                            this.state.users.map((v, i) => {
                                return (
                                    <div key={i} className={styles["course-item"]}>
                                        <div className={styles["course-item-score"]}>
                                            <div><FavIcon /></div>
                                            <div>{v.subscribed}</div>
                                        </div>
                                        <span className={styles["course-item-user-avatar"]}>
                                            <img src={v.avatar}></img>
                                        </span>
                                        <div className={styles["course-item-main"]}>
                                            <Link to={"/user/" + v.id} className={styles["course-item-user"]}>
                                                <span className={styles["course-item-user-name"]}>
                                                    {v.root}
                                                </span>
                                            </Link>
                                            <div className={styles["course-item-desc"]}>
                                                {v.profile}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
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

UserSearch.contextType = MainContext;

export default UserSearch;