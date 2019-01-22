import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from './Loading'
import './Drawer.css'

class MyDrawer extends Component {

    constructor (props) {
        super(props);
    }
        
    render() {

        let context = this.props.list.map(el =>(
            <div onClick={(e) => this.props.click(el)}>
                {el}
            <br/>
            <hr/>
            </div>
        ))

        return (
            <div className="D_body">
                <a href="javascript:void(0)" onClick={(e) => this.props.close()} className="close_button">
                    &lt;
                </a>
                <hr/>
                {context}
            </div>
        );
  	}
}

MyDrawer.PropTypes = PropTypes;

export default MyDrawer;