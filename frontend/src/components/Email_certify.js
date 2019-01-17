import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

class Email extends Component {
    state = {
        flag: false
    };

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        //console.log("monted")
        //console.log(this.props.match.params)
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.post('/api/checkmail/', {
            code: this.props.match.params['code']
        }).then(response => {
            this.props.history.push('/mypage')
            //checked ok mail, goto mypage
        }).catch(e => {
            //Dont checked mail, print BLOCK page
            this.setState({flag: true})
        })
    }

    render() {

        var body = null;
        var fail = <div>email Certification is fail or already done email check. try re-send email.</div>

        if(this.state.flag){
            body = fail
        }else
            body = null;

        return (
            <div>
                {body}
                Email Certification
            </div>

        );
  	}
}

Email.PropTypes = PropTypes;

export default Email;
