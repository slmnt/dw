import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { Grid } from '@material-ui/core';

class Back extends Component {
    state = {
        id: 'GugsCdLHm-Q',
        url: ''
    }

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.findid = this.findid.bind(this)
    }

    componentDidMount(){

        this.setState({
            id: this.props.id
        })
    }

    findid(){
        var url = this.state.url
        var id = url.split("/")
        id = id[id.length - 1]
        id = id.split("=")
        id = id[id.length - 1]
        localStorage.setItem('bid', id)
        window.location.reload();
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    render() {
        const opts = {
          playerVars: {
            autoplay: 1,
            disablekb: 1,
            loop: 1,
            showinfo: 0
          }
        };

        const play =<YouTube
            videoId={this.state.id}
            opts={opts}
            onReady={this._onReady}
            />

        return (
            <div>
                <br/>
                <br/>
                <Grid container justify="center">
                <input
                value={this.state.url}
                onChange={this.handleChange}                    
                ></input>&nbsp;
                <button onClick={(e) => {this.findid()}}>reset</button>
                </Grid>
                <br/>
                <Grid container justify="center">
                    {play}
                </Grid>
            </div>
        );
      }
     
      _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }    
}

Back.PropTypes = PropTypes;

export default Back;