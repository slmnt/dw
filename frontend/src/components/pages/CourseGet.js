import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

class CourseGet extends Component {
    state = {
        contents: ""
    }

    constructor (props) {
        super(props);

    }

    componentDidMount(){
        /**
         * Requirement
         *  CourseContent Rendering
         *      this.state.contents
         */
        axios.post('/getusercourseindex/', {
            id:this.props.match.params.id,
            cid:this.props.match.params.number}
            ).then(response => {
            console.log(response.data)
            this.setState({contents: response.data})
        }).catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                courseget
                {this.state.contents === "" && <div>No Such Contents</div>}
            </div>
        );
  	}
}

CourseGet.PropTypes = {};

export default CourseGet;