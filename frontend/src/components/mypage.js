import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
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
        userinfo: {}
    };

    constructor(props){
        super(props)
        // return backpage
        // props.history.goBack()
    }

    onclicked(e){
        console.log(e)
    }


    componentDidMount(){
        axios.get('/api/user/').then(response => {
            this.setState({userinfo: response.data})
        })
    }

    render() {
        const { spacing } = this.state;

        return (
            <div>
                <Grid container className={this.props.classes.root} spacing={16}>
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
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('c')}>
                        <Card className={this.props.classes.one}>
                                <CardContent>
                                    c
                                </CardContent>
                        </Card>
                        </CardActionArea>
                        </Grid>
                    </Grid>                    
                    <Grid container>
                        <Grid item>
                        <br/>
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('cpp')}>
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
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('java')}>
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
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('python')}>
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
