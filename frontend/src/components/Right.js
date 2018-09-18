import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Right extends Component {
    state = {
        data: []
    };
    
    constructor(props){
        super(props)

    }

    componentDidMount(){
        axios.get('/api/getboard/').then(response => {
            this.setState({data: response.data})
            console.log(this.state.data)
        })
    }
    render() {
        return (
            <div>
                <ul>
                {this.state.data.map(el => (
                    <li key={el.id}>
                    {el.id}: {el.text}
                    </li>
                ))}
                </ul>
            </div>
		);
  	}
}

export default Right;
