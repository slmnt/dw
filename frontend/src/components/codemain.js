import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
})

// react-paginatge is crash react meterial-ui
  class Codeselect extends Component {
    state = {
    };

    constructor(props){
        super(props)
        console.log(props.history.location.pathname)
    }

    render() {

        return (
            <div>
                None
            </div>        
		);
  	}
}

export default withStyles(styles)(Codeselect);
