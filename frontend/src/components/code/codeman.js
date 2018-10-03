import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Py from './python';
import Card from '@material-ui/core/Card';
import { Scrollbars } from 'react-custom-scrollbars';

import './codeman.css'

const styles = theme => ({
    test: {
        height: window.innerHeight
    },
    test1: {
    },
    test2: {
        height: window.innerHeight * 0.55 
    },
    test3: {
        height: window.innerHeight * 0.4
    },
    card: {
        width: window.innerWidth / 2
    }
})

// react-paginatge is crash react meterial-ui
  class Codeman extends Component {

    render() {
        const { classes, theme } = this.props;

        return (
            <Grid className={classes.test} container>
                <Grid xs={6} item className={classes.test1}>
                test
                </Grid>
                <Grid xs={6} item >
                    <Grid container className={classes.test2}>
                        <Scrollbars>        
                            <Py/>
                        </Scrollbars>
                    </Grid>
                    <Grid container className={classes.test3}>
                    test2
                    </Grid>
                </Grid>
            </Grid>
		);
  	}
}

export default withStyles(styles)(Codeman);
