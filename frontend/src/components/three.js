import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Minecraft from '../games/Minecraft';

const styles = theme => ({
    main:{
        position: 'relative',
        top: 1,
        left: 1
    },
})

class three extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

        Minecraft.setRendererElement(document.getElementById("canvas"));
        Minecraft.setStatsElement(document.getElementById("gameFrame"));

        Minecraft.init();
        this.update();
    }
    update = () => {
        window.requestAnimationFrame(this.update);
        Minecraft.update();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.main}>
                <div id="gameFrame" style={{position: "relative"}}>
                    <canvas id="canvas"></canvas>
                </div>
            </div>
        );
  	}
}

three.propTypes = {
    //classes: PropTypes.object.isRequired,
    //theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(three);
