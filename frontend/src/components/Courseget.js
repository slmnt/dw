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
        var u = '/getusercourseid/' + this.props.match.params.id + "/" + this.props.match.params.number
        axios.get(u).then(response => {
            // console.log(response.data[0])
            if(typeof response.data[0] !== "object");
            else
                this.setState({contents: response.data[0]})
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