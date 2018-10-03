import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import GoldenLayout from 'golden-layout';

const styles = theme => ({
    test: {
        height: window.innerHeight
    },
})

// react-paginatge is crash react meterial-ui
  class Codeman extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    /* you can pass config as prop, or use a predefined one */
    // const instance = new GoldenLayout(this.props.config);
    /* register components or bind events to your new instance here */
    // instance.init();
        console.log(this.props)
    }    
    getInitialState(){
        return { value: this.props.value || 'bla' };
    }

    setValue(e){
        this.setState({ value: e.target.value });
    }
    setContainerTitle(){
        this.props.glContainer.setTitle( this.state.value );
    }
    render() {
        const { classes, theme } = this.props;

        return (
            <div>
                test
            </div>
        );
  	}
}

export default withStyles(styles)(Codeman);
