import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import './BoardGet.css'
import crypto from 'crypto'

import { Scrollbars } from 'react-custom-scrollbars';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';

class Board extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: false,
            comment: '',
            comments: []
        }
    }

    componentDidMount(){

        //console.log(sessionStorage.getItem('key'))
        const cipher = crypto.createCipher('aes192', 'testword');

        let encrypted = '';
        cipher.on('readable', () => {
          const data = cipher.read();
          if (data)
            encrypted += data.toString('hex');
        });
        cipher.on('end', () => {
        });        
        cipher.write('some clear text data');
        cipher.end();
        //console.log(encrypted);

        const decipher = crypto.createDecipher('aes192','testword');

        let decrypted = '';
        decipher.on('readable', () => {
        const data = decipher.read();
        if (data)
            decrypted += data.toString('utf8');
        });
        decipher.on('end', () => {
        //console.log(decrypted);
        // Prints: some clear text data
        });

        decipher.write(encrypted, 'hex');
        decipher.end();
        


        // sessionstorage -> authentic infomation -> crypto?? => incoder , decoder

        let id = this.props.match.params['id']
        axios.get('/api/igetboard/'+id).then(response => {
            this.setState({data: response.data[0]})
        })

        axios.get('/api/getcomment/' +id).then(response => {
            this.setState({comments: response.data})
        })  
    }

    onChange = (newValue) => {
        this.setState({comment: newValue.target.value})
    }    

    addComment = () => {
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
        // console.log(this.state.data)
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

Board.propTypes = {};

export default Board;