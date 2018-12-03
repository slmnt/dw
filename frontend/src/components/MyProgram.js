import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
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
            console.log(this.state.data)
        })

    }

    componentWillUnmount(){

    }

    getcode(id){
        axios.get('/api/igetboard/'+id).then(response => {
            console.log(response.data)
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <Scrollbars  disablehorizontalscrolling={true} style={{ width: "100vw", height: "95vh" }}>
                <br/>
                <Grid container justify="center">
                {(() => {
                if(this.state.data.length > 0){
                    return(
                        <div>
                        {this.state.data.map(el => (
                        <div key={el.id}>
                            <table className={classes.table}>
                            <tbody>
                                <tr>
                                    <td>
                                        {el.count}
                                    </td>
                                    <td>
                                        {el.comments}
                                    </td>
                                    <td onClick={(e) => this.getcode(el.id)}>
                                        {el.title}
                                    </td>
                                    <td>
                                        <span>
                                        {el.auth}
                                        </span>
                                        {el.createat}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        </div>
                        ))}   
                        </div>
                    )
                }
                })()}

                </Grid>
            </Scrollbars>
        );
  	}   
}

Myprogram.PropTypes = PropTypes;
export default withStyles(styles)(Myprogram);

/**
    {(() => {
    if(this.state.data.length > 0){
        return(
            <div>
            {this.state.data.map(el => (
            <div key={el.id}>
                <table className={classes.table}>
                <tbody>
                    <tr className={classes.table_title}>
                        <td colSpan="2">
                            <Typography>
                                {el.title}|
                                {el.codetype}
                                <Divider/>
                                <div className={classes.table_info}>
                                    {el.auth}|
                                    {el.createat}|
                                    {el.updateat}
                                </div>
                            </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.table_body}>
                        <xmp className={classes.table_code}>
                            { el.source}
                        </xmp>
                        <Divider/>
                        <Typography>
                            comment
                        </Typography>
                        </td>
                        <td className={classes.table_right} rowSpan="2">
                        <Typography>
                            right
                        </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.table_extention}>
                        <Typography>
                            <Divider/>
                            extention comments
                        </Typography>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            </div>
            ))}   
            </div>
        )
    }
    })()}
 */