import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';
import './Techinfo.css'
import ReactQuill from 'react-quill';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-quill/dist/quill.snow.css';

class Tech extends Component {
    state = {
        text: '',
        key: false,
        open: false
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)    
        this.check = this.check.bind(this)
        this.output = React.createRef()
        this.onClick = this.onClick.bind(this)
    }
    

    componentDidMount(){
        document.addEventListener('keydown',(e) => this.check(e))

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        //getusercourse
        //getuser
        //getusercoursec
        axios.get('/api/getusercourse/').then(response => {
            console.log(response)
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
     
    onClick(e){
        var ad = document.getElementById('ad')
        console.log(ad)
        if(this.state.open){
            this.setState({open: false})
            ad.style.transform += 'translateX(-100px)'
        }
        else{
            ad.style.transform += 'translateX(100px)'
            this.setState({open: true})
        }


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

        let edd = editor;

        if(this.state.key)
            edd = editor

        return (
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
            <div className="body">
                {edd}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <a className="submit" href="javascript:void(0)" onClick={(e) => this.onClick(e)} >投稿</a>
                <br/>
                <div id="ad" className="tech_test">広告</div>

            </div>
            </Scrollbars>
        )
    }
}

Tech.propTypes = {};

export default Tech;