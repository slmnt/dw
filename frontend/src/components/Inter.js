import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import './inter.css'


class Interf extends Component {
    state = {
        log: 'current version 0.0.1\nType "help", "copyright", "credits" or "license" for more information.\n',
        line: 3,
        cmd: 'test'
    }

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.event = this.event.bind(this)

        document.addEventListener('keypress', e => this.event(e))

    }

    event(e){
        if(e.key === 'Enter'){
            if(this.state.cmd === 'cls'){
                this.setState({line: 1})
                this.setState({log: ''})
                this.setState({cmd: ''})    
            }else{
                this.setState({log: this.state.log + this.state.cmd + '\n'})
                this.setState({cmd: ''})
                this.setState({line: this.state.line + 1})
            }

        }
    }

    handleChange(event) {
        this.setState({cmd: event.target.value});
    }
    
    render() {

        const print = (
            <textarea 
            rows={this.state.line} 
            cols="100"
            className="print"
            value={this.state.log}
            disabled
            />
        );

        return (
            <div className="form">
                {print}
                <br/>
                <label for="textInput" >>>></label>
                <input 
                    type="text" 
                    className="custom"
                    maxlength={100}
                    value={this.state.cmd} 
                    onChange={this.handleChange}
                    autoFocus
                />
            </div>

        );
  	}
}

Interf.PropTypes = PropTypes;

export default Interf;
