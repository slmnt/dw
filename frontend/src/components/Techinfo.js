import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import './Techinfo.css'
//import ReactQuill from 'react-quill';
//import * as qu from 'quill-markdown-shortcuts'
//import 'react-quill/dist/quill.snow.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';


class Tech extends Component {
    state = {
        text: '',
        key: false
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)    
        this.check = this.check.bind(this)
        this.output = React.createRef()
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
        //this.output.current.innerHTML = this.state.text
        //console.log(this.output)
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
        /**
         * 
         * 
         * 
         const editor =  <ReactQuill 
                             modules={this.modules}
                             className="Tech_editor" 
                             value={this.state.text} 
                             onChange={this.handleChange} />
                             let edd = editor;
                             {edd}
                             if(this.state.key)
                                 edd = editor
         */



        return (
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
            <div className="body">
                <div className="tech_test">
                    広告
                </div>
                <input className="submit" type="submit" value="投稿" /><br/>
                <output name="result">{this.state.text}</output>
            </div>
            </Scrollbars>
        )
    }
}

Tech.PropTypes = PropTypes;

export default Tech;