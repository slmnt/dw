import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Interpreter from '../modules/Interpreter'
import './Inter.css'


class Interf extends Component {
    state = {
        log: 'current version 0.0.1\nType "help", "copyright", "credits" or "license" for more information.\n',
        cmd: 'test'
    }

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.event = this.event.bind(this)

        this.Int = new Interpreter()
        document.addEventListener('keypress', e => this.event(e))

    }

    componentWillUnmount(){
        document.removeEventListener('keypress', e => this.event(e))
    }

    event(e){
        if(e.key === 'Enter'){
            if(this.state.cmd === 'cls'){
                this.setState({log: ''})
                this.setState({cmd: ''})    
            }else{
                var r = this.Int.run(this.state.cmd)
                this.setState({log: this.state.log +'>>>' +this.state.cmd + '\n'})
                this.setState({cmd: ''})
                if(r){
                    this.setState({log: this.state.log  + r + '\n'})
                }
            }
        }
    }

    handleChange(event) {
        this.setState({cmd: event.target.value});
    }
    
    render() {
        return (
            <div className="form">
                <pre className="print">{this.state.log}</pre>
                <div className="in">
                <label>>>>
                <input 
                    type="text" 
                    className="custom"
                    maxLength={100}
                    value={this.state.cmd} 
                    onChange={this.handleChange}
                    autoFocus
                />
                </label>
                </div>
            </div>
        );
  	}
}

Interf.propTypes = {};

export default Interf;
