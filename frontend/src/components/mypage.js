import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import bridge from './bridge.jpeg';
import { Scrollbars } from 'react-custom-scrollbars';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    test:{
        position: 'static',
    },
    paper: {
        width: window.innerWidth / 2,
        textAlign:'center',
    },
    icon: {
        desplay:'block',
        borderRadius: '50%',
        height: window.innerWidth / 2 / 2.5,
        width: window.innerWidth / 2 / 2.5,
        maxWidth: '50%',
        padding: window.innerWidth / 2 / 20,
    },
    one:{
        width: window.innerWidth / 2,
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
        spacing: '24',
        userinfo: {},        
        c: 10/26 * 100,
    };

    constructor(props){
        super(props)
        // return backpage
        // props.history.goBack()
        this.set = props.set
        // props.gogo()
    }

    onclicked(e){
        const base = '/codemain/'
        if(e === 'Python')
            this.set('python')
        else if(e === 'Java')
            this.set('java')
        else
            this.set('c_cpp')
        this.props.history.push(base + e)
    }

    componentDidMount(){
        axios.get('/api/user/').then(response => {
            this.setState({userinfo: response.data})
        }).catch((e) => {
            this.props.history.push('login')
        })        
    }

    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }

    render() {
        const { spacing } = this.state;

        return (
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
            <div className={this.props.classes.test}>
            <br/>
            <Grid container spacing={24} direction="column">
                <Grid container item  justify="center" >
                <Grid item xs={6}>
                <Grid container className={this.props.classes.root}>
                    <Grid container spacing={Number(spacing)}>
                        <Grid item>
                            <Card className={this.props.classes.paper}>
                                <CardContent>
                                    <img className={this.props.classes.icon} src={bridge} alt="icon" />
                                    <Typography variant='h4'>
                                        {this.state.userinfo.username}
                                    </Typography>
                                    <Typography>
                                        {this.state.userinfo.email}
                                    </Typography>
                                    <Typography align='right'variant='caption'>
                                        {this.convertdata(this.state.userinfo.last_login)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                        
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                        <br/>
                        <CardActionArea className={this.props.classes.action} onClick={e => this.onclicked('C')}>
                        <Card className={this.props.classes.one}>
                            <CardContent>
                                <Typography>C言語 </Typography>
                                <br/>
                                <LinearProgress variant="determinate" value={this.state.c} color='' />       
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
                                C++
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
                                Java
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
                                Python
                            </CardContent>
                        </Card>
                        </CardActionArea>
                        </Grid>
                    </Grid>                    
                    </Grid>
                </Grid>
                </Grid>
                </Grid>
            </div>    
            </Scrollbars>    
		);
  	}
}

export default withStyles(styles)(Mypage);