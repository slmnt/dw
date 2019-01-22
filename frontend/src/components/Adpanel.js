import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from './Loading'
import './Adpanel.css'

class Ad extends Component {
    state = {
        keyword: 'test'
    }

    constructor (props) {
        super(props);

    }
    
    
    render() {
        return (
            <div className="Ad_body">
                test ad
            </div>
        );
  	}
}

Ad.PropTypes = PropTypes;

export default Ad;