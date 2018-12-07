import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import './Boardget.css'

import { Scrollbars } from 'react-custom-scrollbars';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';

class board extends Component {
    state = {
        data: false,
        comment: '',
        comments: []
    }

    constructor(props){
        super(props)

        this.onChange = this.onChange.bind(this)
        this.addcomment = this.addcomment.bind(this)
    }

    componentDidMount(){

        console.log(sessionStorage.getItem('key'))

        let id = this.props.match.params['id']
        axios.get('/api/igetboard/'+id).then(response => {
            this.setState({data: response.data[0]})
        })

        axios.get('/api/getcomment/' +id).then(response => {
            this.setState({comments: response.data})
        })  
    }

    onChange(newValue) {
        this.setState({comment: newValue.target.value})
    }    

    addcomment(){
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        let id = this.props.match.params['id']        
        axios.post('/api/addcomment/', {
            id: id,
            text: this.state.comment
        }).then(response => {
            this.setState({comments: response.data})
            this.setState({comment: ''})
        })
    }

    wait2sec(x){
        return new Promise(resolve =>{
            resolve(x)
            axios.get('/api/igetboard/'+3).then(response => {
                this.setState({data: response.data[0]})
            })
        })
    }

    async syn(){
        var x = await this.wait2sec(1)
        console.log(this.state.data)
    }

    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }

    render() {

        const commentin = <div>
            <textarea className="comment" value={this.state.comment} onChange={(e)=> this.onChange(e)} ></textarea>
            <br/>
            <button onClick={(e) => this.syn()} >send</button>
        </div>

        let comm = this.state.comments.map(el =>(
            <div key={el.id}>
            {el.auth}
            <div className="comment_date">
                {this.convertdata(el.createat)}
            </div>
            <div className="comment_body">
                {el.coments}
            </div>
            <br/>
            <Divider/>
            </div>
        ))

        return (
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
            <div className="board">
                <br/>
                <br/>
                <Grid container justify="center">
                <table className="table_board">
                <tbody>
                    <tr>
                        <td colSpan="2">
                            {this.state.data.title}                        
                            {this.state.data.codetype}
                            <Divider/>
                            <div className="info">
                                {this.state.data.auth}|
                                {this.convertdata(this.state.data.createat)}|
                                {this.convertdata(this.state.data.updateat)}
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
                            {comm}
                        </td>
                    </tr>
                    </tbody>
                </table>
                </Grid>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            </Scrollbars>
        );
  	}
}

board.PropTypes = PropTypes;

export default board;