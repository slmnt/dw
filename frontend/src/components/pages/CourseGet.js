import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import TextEditor from '../TextEditor';
import DirTree from '../DirTree';
import TestIFrame from '../TestIFrame';


import api from '../../modules/api';
import styles from './CourseGet.module.css';


class CourseGet extends Component {
    state = {
        contents: ""
    }

    constructor (props) {
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            chapterId: this.props.match.params.ch,
            
            currentSlide: null,
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
            <div className={styles["main"]}>
                <div className={styles["slide-container"]}>
                    <TestIFrame content={this.state.currentSlide && this.state.currentSlide.text || "test"} />
                    <div className={styles["slide-controls"]}></div>
                </div>
                <div className={styles["editor-container"]}>
                    <div className={styles["dirtree-container"]}>
                        {/*
                        */}
                        <DirTree dir={this.state.directory} openFile={path => {this.window.current.openTab(path);}} />
                    </div>
                    <div className={styles["textditor-container"]}>
                        <TextEditor ref={this.window} />
                        {/*
                        */}
                    </div>
                </div>  
            </div>
        );
  	}
}

CourseGet.propTypes = {};

export default CourseGet;