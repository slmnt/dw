import React, { Component } from 'react';   
import PropTypes from 'prop-types';

import Minecraft from '../games/Minecraft';

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
    componentWillUnmount(){
        Minecraft.destroy();
    }
    update = () => {
        window.requestAnimationFrame(this.update);
        Minecraft.update();
    }

    render() {
        return (
            <div>
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


export default three;
