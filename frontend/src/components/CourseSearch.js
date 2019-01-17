import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from './Loading'
import './CourseSearch.css'

class CourseSearch extends Component {
    state = {
        keyword: 'test'
    }

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        this.setState({keyword: event.target.value});
        var select = document.getElementById('type')
        console.log(select.selectedIndex)
      }
    
    render() {
        return (
            <div className="coursesearchbody">
            <br/>
                <select id="type">
                    <option value="">--Please choose an option--</option>
                    <option value="c">C</option>
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                </select>
                &nbsp;
                <input value={this.state.keyword} onChange={this.handleChange} ></input>
                <br/>
                Searching....
                <div className="Sloading">
                    <Loading/>
                </div>                
            </div>
        );
  	}
}

CourseSearch.PropTypes = PropTypes;

export default CourseSearch;