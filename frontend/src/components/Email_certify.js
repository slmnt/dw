import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

class Email extends Component {
    state = {
        certi: ""
    };

    constructor(props){
        super(props)
        this.setState({certi: props.match.params['code']})        
    }

    componentDidMount(){
        //console.log("monted")
        //console.log(this.props.match.params)
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.post('/api/checkmail/', {
            code: this.props.match.params['code']
        }).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })

    }

    render() {
        return (
            <div>
                Email Certification
            </div>

        );
  	}
}

Email.PropTypes = PropTypes;

export default Email;
