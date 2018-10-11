import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    test:{
        position: 'static',
    },
    paper: {
    height: window.innerHeight / 7,
    width: window.innerWidth / 7,
    },
    sub: {
    height: window.innerHeight / 7,
    width: window.innerWidth / 4,
    },
    one:{
    width: window.innerWidth / 7 + window.innerWidth / 4 + 16,
    },
    control: {
    padding: theme.spacing.unit * 2,
    },    
    action: {
    borderRadius: 5
    }
})
// react-paginatge is crash react meterial-ui
  class Mypage extends Component {
    state = {
        spacing: '16',
        userinfo: {},
        c: 10/26 * 100,
    };

    constructor(props){
        super(props)
        // return backpage
        // props.history.goBack()
        console.log(props)
        // props.gogo()
    }

    onclicked(e){
        var base = '/codemain/'
        this.props.history.push(base + e)
    }


    componentDidMount(){
        axios.get('/api/user/').then(response => {
            this.setState({userinfo: response.data})
        })
    }

    render() {
        const { spacing } = this.state;

        return (
            <div className={this.props.classes.test}>
                <Grid container className={this.props.classes.root}>
                    <Grid container spacing={Number(spacing)}>
                        <Grid item>
                            <Card className={this.props.classes.paper}>
                                <CardContent>
                                    <Typography variant='caption'>
                                        {this.state.userinfo.last_login}
                                    </Typography>
                                    <Typography>
                                        {this.state.userinfo.username}
                                    </Typography>
                                    <Typography>
                                        {this.state.userinfo.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                        <Card className={this.props.classes.sub}>
                                <CardContent>
                                    additional info
                                </CardContent>
                        </Card>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                        <br/>
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('C')}>
                        <Card className={this.props.classes.one}>
                                <CardContent>
                                    <Typography>c </Typography>
                                    <br/>
                                    <LinearProgress variant="determinate" value={this.state.c} />       
                                    <Typography align='right'>10/26</Typography>                             
                                </CardContent>
                        </Card>
                        </CardActionArea>
                        </Grid>
                    </Grid>                    
                    <Grid container>
                        <Grid item>
                        <br/>
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('Cpp')}>
                        <Card className={this.props.classes.one}>
                                <CardContent>
                                    cpp
                                </CardContent>
                        </Card>
                        </CardActionArea>
                        </Grid>
                    </Grid>                    
                    <Grid container>
                        <Grid item>
                        <br/>
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('Java')}>
                        <Card className={this.props.classes.one}>
                                <CardContent>
                                    java
                                </CardContent>
                        </Card>
                        </CardActionArea>
                        </Grid>
                    </Grid>                    
                    <Grid container>
                        <Grid item>
                        <br/>
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('Python')}>
                        <Card className={this.props.classes.one}>
                                <CardContent>
                                    python
                                </CardContent>
                        </Card>
                        </CardActionArea>
                        </Grid>
                    </Grid>                    
                </Grid>
            </div>        
		);
  	}
}

export default withStyles(styles)(Mypage);
