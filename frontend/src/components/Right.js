import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

// react-paginatge is crash react meterial-ui
const styles = ({
    card: {
      minWidth: 'auto',
      borderRadius: 15,
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  class Right extends Component {
    state = {
        data: [],
        activePage: 0,
        pagelimit: 0
    };


    constructor(props){
        super(props)

        this.handlePageClick = this.handlePageClick.bind(this)
    }

    componentDidMount(){
        axios.get('/api/getboardnum/').then(response => {
            this.setState({pagelimit: response.data})
        })
        axios.post('/api/getboardpage/',{num: this.state.activePage}).then(response => {
            this.setState({data: response.data})
        }).catch(e => {            
            // console.log(e)
        })      
        this.setState({activePage: 1})
    }

    handlePageClick() {
        axios.post('/api/getboardpage/',{num: this.state.activePage}).then(response => {
            var dum = this.state.data
            var now = this.state.data.length
            for(var i = 0; i < response.data.length; i++){
                dum[now + i] = response.data[i]
            }
            this.setState({data: dum})
            // this.setState({data: response.data})
        }).catch(e => {
        // console.log(e)
        })      
        this.setState({activePage: this.state.activePage+1})

    }
    
    render() {

        return (
            <div>
            {(() => {
                if(this.state.data.length > 0){
                    return(
                        this.state.data.map(el => (
                            <div key={el.id}>
                                <Card className={this.props.classes.card}>
                                <CardContent>
                                <Typography className={this.props.classes.title} color="textSecondary">
                                    subtitle
                                </Typography>
                                <Typography variant="headline" component="h2">
                                    {el.id}
                                </Typography>
                                <Typography className={this.props.classes.pos} color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography component="p">
                                    {el.text}
                                </Typography>
                                </CardContent>
                                </Card>
                                <br/>                                                
                            </div>
                        ))
                    )                    
                }
            })()}
        <br/>
        <br/>      
            <div style={{ display: 'flex', margin: 40}}>
            <Grid container direction="column">
                <Grid container item justify="center" >
                <Grid item xs={3}>
                <CardActionArea onClick={this.handlePageClick}>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography align='center' color='secondary'>
                        Add more...
                        </Typography>
                        </CardContent>
                    </Card>
                        </CardActionArea>
                </Grid>
                </Grid>
            </Grid>
            </div>
        <br/>
        </div>        
		);
  	}
}

export default withStyles(styles)(Right);
