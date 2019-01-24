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
        var u = '/getusercourseindex/'
        axios.post(u,{
            id:this.props.match.params.id,
            cid:this.props.match.params.number}
            ).then(response => {
            console.log(response.data)
            this.setState({contents: response.data})
        }).catch(e => console.log(e))
    }

    render() {

        const err = <div>No Such Contents</div>
        let meg;

        if(this.state.contents === "")
            meg = err;
        else
            meg = null

        return (
            <div>
                courseget
                {meg}
            </div>
        );
  	}
}

CourseGet.PropTypes = PropTypes;

export default CourseGet;