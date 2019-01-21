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
         * 
         */
        var u = '/getusercourseid/1/1'
        axios.get(u).then(response => {
            this.setState({contents: response.data})
        }).catch(e => console.log(e))
        console.log(this.props.match.params)
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