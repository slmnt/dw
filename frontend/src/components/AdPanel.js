import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from './Loading'
import styles from './AdPanel.module.css'

class Ad extends Component {
    state = {
        keyword: 'test'
    }

    constructor (props) {
        super(props);
    }
        
    render() {
        return (
            <div className={styles.main}>
                test ad
            </div>
        );
  	}
}

Ad.propTypes = {};

export default Ad;