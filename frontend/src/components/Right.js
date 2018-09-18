import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        activePage: 1,
    };

    constructor(props) {
        super(props);

        this.handlePageChange = this._handlePageChange.bind(this);
    }


    componentDidMount(){
        axios.get('/api/getboard/').then(response => {
            this.setState({data: response.data})
            console.log(this.state.data)
        })
    }

    _handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
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
        <br/>
    </div>        
		);
  	}
}

export default withStyles(styles)(Right);
