import React, { Component } from 'react';   
import PropTypes from 'prop-types';

class course2 extends Component {

    constructor(props){
        super(props)
        console.log(props.match.params)
        this.onclick = this.onclick.bind(this)
    }

    onclick(){
        this.props.history.push('/codemain/C')
    }

    render() {

        return (
            <div>
                <button onClick={this.onclick}>
                    goback
                </button>
                2       
            </div>

        );
  	}
}

course2.PropTypes = PropTypes;

export default course2;
