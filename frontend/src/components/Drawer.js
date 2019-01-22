import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from './Loading'
import './Drawer.css'

class MyDrawer extends Component {

    constructor (props) {
        super(props);

    }
    
    
    render() {
        console.log(this.props)

        return (
            <div className="D_body">
                MyDrawer
                <hr/>
            </div>
        );
  	}
}

MyDrawer.PropTypes = PropTypes;

export default MyDrawer;