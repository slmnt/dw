import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import $ from "jquery";

const styles = theme => ({
    layout: {
        textAlign:"center",
    },

    card: {
        width: window.innerWidth * 0.8,
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
        width: window.innerWidth * 0.7,
        backgroundColor:"#00FF00",
        textAlign:"center",
        border: 10

    },
    table_title:{
        backgroundColor:"#FF0000",

    },
});
  
class Myprogram extends Component {
    state = {
        width: 0,
        height: 0
    }
    constructor(props) {
        super(props);

        this.update = this.update.bind(this)
    }
    
    update(){
        this.setState({
            width: $(window).width(),
            height: $(window).height()
        })
        console.log(this.state.width, this.state.height)
    }

    componentDidMount(){
        window.addEventListener('resize',this.update)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.update)

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <br/>
                <Grid container justify="center">
                <Card className={classes.card} center={"true"}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Number, tag section
                    </Typography>
                    <Typography component="h2">
                    Title section
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    username, create by, update by
                    </Typography>
                    <Typography component="p">
                    body section
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} size="small" mini >comment</Button>
                </CardActions>
                <Divider/>
                <CardContent>
                    <Typography component="p">
                        Comment1
                    </Typography>
                </CardContent>
                <Divider/>
                <CardContent>
                    <Typography component="p">
                        Comment2
                    </Typography>
                </CardContent>
                
                {/*stack overflow layout  */}
                <Divider/>
                <CardContent>
                    <table>
                        <tbody>
                            <tr>
                                <td>Box1</td>
                                <td>Box2</td>
                                <td>Box3</td>
                                <td>body</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>

                <Divider/>
                <Grid container justify="center">
                <CardContent>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.table_title}>
                                <td colSpan="2">
                                title
                                </td>
                            </tr>
                            <tr>
                                {/** */}
                                <td width={window.innerWidth * 0.5}>body</td>
                                {/** */}
                                <td>right</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
                </Grid>

                </Card>                
                </Grid>
            </div>
        );
  	}
}

Myprogram.PropTypes = PropTypes;
export default withStyles(styles)(Myprogram);