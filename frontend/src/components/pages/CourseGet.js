import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import TextEditor from '../TextEditor';
import DirTree from '../DirTree';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import api from '../../modules/api'


class CourseGet extends Component {
    state = {
        contents: ""
    }

    constructor (props) {
        super(props);
        this.state = {
            directory: { // directory structure
                children: [
                  {
                    name: "src",
                    children: [
                      {
                        name: "index.js"
                      }
                    ]
                  },
                  { name: "app.js" },
                  { name: "app1.js" },
                  { name: "app2.js" },
                  { name: "app3.js" },
                ]
            }   
        }
        this.window = React.createRef();

    }

    componentDidMount(){
        /**
         * Requirement
         *  CourseContent Rendering
         *      this.state.contents
         */
        axios.post('/getusercourseindex/', {
            id:this.props.match.params.id,
            cid:this.props.match.params.number}
            ).then(response => {
            console.log(response.data)
            this.setState({contents: response.data})
        }).catch(e => console.log(e))
    }

    render() {
        return (
            <div
                style={{
                display: "flex",
                lineHeight: "120%",
                fontSize: "0.6em",
                color: "#cccccc",
                height: "100%",
                width: "100%",
                }}
            >
                <div
                    style={{
                        flex: "0 0 auto",
                        width: "200px",
                        overflow: "hidden auto",
                        borderRight: "1px solid #666666",
                    }}
                >
                    {/*
                    */}
                    <DirTree dir={this.state.directory} openFile={path => {this.window.current.openTab(path);}} />
                </div>
                <div
                    style={{
                        flex: "1 1 auto",
                        height: "100%",
                        width: "100%",      
                    }}
                >
                    <TextEditor ref={this.window} />
                    {/*
                    */}
                </div>
            </div>  
        );
  	}
}

CourseGet.PropTypes = {};

export default CourseGet;