import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loading from '../Loading'
import './MyProgram.css'

import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Scrollbars } from 'react-custom-scrollbars';

const styles = theme => ({
    layout: {
        textAlign:"center",
    },

    card: {
        width: "80vw",
    },
    button: {
        fontSize: 10,
    },
    title: {
      fontSize: 18
    },
    pos: {
      marginBottom: 12,
    },
    table:{
        width: "70vw",
        // backgroundColor:"#00FF00",
        textAlign:"center",
        border: 10

    },
    table_title:{
        //backgroundColor:"#FF0000",
        textAlign:"auto",
    },
    table_body:{
        textAlign:"auto",
        //backgroundColor:"#FF00FF",
        width: "50vw"
        
    },
    table_extention:{
        textAlign:"auto",
        //backgroundColor:"#F0F0F0",
    },
    table_right:{
        //backgroundColor:"#FFFFFF",
    },
    table_info:{
        textAlign:"right",
    },
    table_code:{
        width: "50vw"
    }

});

class Myprogram extends Component {
    state = {
        data: [],
        activePage: 0,
        pagelimit: 0,
        open: false,
        select: 0,
        search: '',
    }

    constructor(props) {
        super(props);

        this.go = props.go
        this.update = this.update.bind(this)
        this.search = this.search.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    update(){
    }

    componentDidMount(){
        //axios.get('/api/code/').then(response => {
        //    this.setState({data: response.data})
        //    console.log(this.state.data)
        //})

        axios.get('/api/getlist/').then(response => {
            this.setState({data: response.data})
            // console.log(this.state.data)
        })

    }

    componentWillUnmount(){
    }

    getcode(id){
        this.go('/Board/' + id)
    }

    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }

    search(){
        let element = document.getElementById("selecter")
        let val = element.options[element.selectedIndex].value

        axios.get('/api/search/' + val + '/' + this.state.search).then(response => {
            this.setState({data: response.data})
        })
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    render() {
        const { classes } = this.props;

        return (
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
                <br/>
                <Grid container justify="center">
                    <div className="boards_search">
                        <select className="boards_search-select" name="type" id="selecter">
                            <option value={1}>title</option>
                            <option value={2}>body</option>
                            <option value={3}>username</option>
                        </select>&nbsp;
                        <input className="boards_search-textarea"
                        value={this.state.search}
                        onChange={this.handleChange}
                        maxLength="20"
                        ></input>&nbsp;
                        <button className="boards_search-button" onClick={(e) => this.search()} >seaarch</button>
                    </div>
                </Grid>
                <br/>
                <Grid container justify="center">
                <br/>
                {(() => {
                if(this.state.data.length > 0){
                    return(
                        <div>
                        <table className={classes.table}>
                            <tbody className="boards_body">
                        {this.state.data.map(el => (
                        <div key={el.id}>
                        <Divider/>
                            <tr>
                                <td className="boards_line">
                                    {el.count}
                                    <div className="board_cap">
                                        count
                                    </div>
                                </td>
                                <td className="boards_line">
                                    {el.comments}
                                    <div className="board_cap">
                                        comments
                                    </div>
                                </td>
                                <td onClick={(e) => this.getcode(el.id)} className="boards_title">
                                    {el.title}
                                    <div className="board_type">
                                        {el.codetype}
                                    </div>
                                </td>
                                <td className="boards_auth">
                                    <span>
                                    {el.auth}
                                    </span>
                                    <div className="boards_date">
                                        {this.convertdata(el.createat)}
                                    </div>
                                    <br/>
                                </td>
                            </tr>
                        </div>
                        ))}   
                        </tbody>
                        </table>
                        <Divider/>
                        </div>
                    )
                }else{
                    return <div className="loading">
                        <Loading/>
                        </div>
                }
                })()}

                </Grid>
            </Scrollbars>
        );
  	}   
}

Myprogram.propTypes = {};
export default withStyles(styles)(Myprogram);
