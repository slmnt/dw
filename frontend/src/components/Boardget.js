import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import './Boardget.css'

import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';

class board extends Component {
    state = {
        data: [],
    }

    constructor(props){
        super(props)

        this.commentsend = this.commentsend.bind(this)
    }

    componentDidMount(){
        let id = this.props.match.params['id']
        axios.get('/api/igetboard/'+id).then(response => {
            this.setState({data: response.data[0]})
            console.log(this.state.data)
        })
    }

    commentsend(){
        console.log("comment")

    }

    render() {

        const commentin = <div>
            <textarea className="comment"></textarea>
            <br/>
            <button>send</button>
        </div>
            
        return (
            <div className="board">
                <br/>
                <br/>
                <Grid container justify="center">
                <table>
                <tbody>
                    <tr>
                        <td colSpan="2">
                            {this.state.data.title}                        
                            {this.state.data.codetype}
                            <Divider/>
                            <div className="info">
                                {this.state.data.auth}|
                                {this.state.data.createat}|
                                {this.state.data.updateat}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <xmp className="body">
                            {this.state.data.source}
                        </xmp>
                        <Divider/>
                        <br/>
                        {commentin}
                        </td>
                        <td rowSpan="2" className="right">
                            right
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Divider/>
                            extention comments
                        </td>
                    </tr>
                </tbody>
            </table>
            </Grid>
            </div>
        );
  	}
}

board.PropTypes = PropTypes;

export default board;
