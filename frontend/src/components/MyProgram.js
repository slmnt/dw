import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loading from './Loading'
import './Myprogram.css'

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
    }

    constructor(props) {
        super(props);

        this.go = props.go
        this.update = this.update.bind(this)
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

    render() {
        const { classes } = this.props;

        return (
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
                <br/>
                <Grid container justify="center">
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
                        <Divider className="loading" />
                        </div>
                    )
                }else{
                    return <Loading/>
                }
                })()}

                </Grid>
            </Scrollbars>
        );
  	}   
}

Myprogram.PropTypes = PropTypes;
export default withStyles(styles)(Myprogram);
