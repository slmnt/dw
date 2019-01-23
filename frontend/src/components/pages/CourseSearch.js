import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from '../Loading'
import './CourseSearch.css'
import Ad from '../Adpanel'
import axios from 'axios';

import { Link } from 'react-router-dom';

class CourseSearch extends Component {
    state = {
        keyword: 'test',
        context: []
    }

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    componentDidMount(){
        var u = '/getusercourse'
        axios.get(u).then(response => {
            this.setState({
                context: response.data
            })
        }).catch(e => console.log(e))
    }
    
    handleChange(event) {
        this.setState({keyword: event.target.value});
    }

    onSearch(e){
        var select = document.getElementById('type')
        console.log(select.selectedIndex)
    }
    
    render() {
        return (
            <div className="coursesearchbody">
                <div className="coursesearch_ad">
                <Ad/>
                </div>
            <br/>
                <select id="type" className="boards_search-select">
                    <option value="">--Please choose an option--</option>
                    <option value="c">C</option>
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                </select>   
                &nbsp;
                <input 
                onKeyPress={(e) => e.nativeEvent.key === "Enter" ? this.onSearch(e)  : void(0)} 
                className="boards_search-textarea" 
                value={this.state.keyword} 
                onChange={this.handleChange} ></input>
                &nbsp;
                <a className="Sbuttom" href="javascript:void(0)"
                    onClick={this.onSearch}>Search</a>
                <hr className="courseSearch_HR"/>
                {
                    this.state.context.map((el) => {
                        return (
                            <div className="coursesearch_block">
                                <Link to={"/course/" + el.id} className="courseSearch_title">
                                    {el.title}
                                </Link>
                                <div className="courseSearch_auth">
                                    {el.root}
                                </div>
                                <div className="courseSearch_createat">
                                    createat
                                </div>
                                <div className="courseSearch_type">
                                    {el.likes}
                                </div>
                                <hr className="courseSearch_HR"/>                            
                            </div>
                        )
                    })
                }
            </div>
        );
  	}
}

CourseSearch.PropTypes = PropTypes;

export default CourseSearch;