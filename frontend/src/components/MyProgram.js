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
});
  
class Myprogram extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {

        const { classes } = this.props;

        return (
            <div>
                <br/>
                <Grid container justify="center">
                <Card className={classes.card} center>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Number, tag section
                    </Typography>
                    <Typography variant="h5" component="h2">
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
                </Card>                
                </Grid>
            </div>
        );
  	}
}

Myprogram.PropTypes = PropTypes;
export default withStyles(styles)(Myprogram);