import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import './Techinfo.css'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Tech extends Component {
    state = {
        text: '',
        key: false
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)    
        this.check = this.check.bind(this)
    }
    

    componentDidMount(){
        document.addEventListener('keydown',(e) => this.check(e))

        axios.get('/api/getauth/').then(response => {
            this.setState({
                key: true
            })
        }).catch((e) =>{            
            console.log(e)
        })


        // window.setInterval(this.alram(socket),1000)
    }

    alram(){
        console.log("alram")
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',(e) => this.check(e))
    }

    check(e){
        if(e.ctrlKey && e.code ===  "KeyS"){
            e.preventDefault()
        }
    }

    handleChange(value) {
        this.setState({ text: value })
    }
     
    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
        ]
    }   

    render() {

        const editor =  <ReactQuill 
                            modules={this.modules}
                            className="Tech_editor" 
                            value={this.state.text} 
                            onChange={this.handleChange} />

        let edd = null;

        if(this.state.key)
            edd = editor

        return (
            <div>
                <div className="tech_test">
                    test
                </div>
                {edd}
            </div>
        )
    }
}

Tech.PropTypes = PropTypes;

export default Tech;