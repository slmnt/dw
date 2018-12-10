import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import './Techinfo.css'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Tech extends Component {

    constructor(props) {
        super(props);

        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)    
        this.check = this.check.bind(this)
    }
    

    componentDidMount(){
        document.addEventListener('keydown',(e) => this.check(e))
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
        console.log(this.state.text)
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
        return (
          <ReactQuill 
          modules={this.modules}
          className="Tech_editor" value={this.state.text} onChange={this.handleChange} />
        )
    }
}

Tech.PropTypes = PropTypes;

export default Tech;
