import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

import TextEditor from '../TextEditor';
import DirTree from '../DirTree';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import api from '../../modules/api';
import styles from './CourseGet.module.css';


class CourseGet extends Component {
    state = {
        contents: ""
    }

    constructor (props) {
        super(props);
        this.state = {
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
                <div className={styles["slides-container"]}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.currentSlide && this.state.currentSlide.text || "test"}
                        config={{
                            removePlugins: 'toolbar',
                        }}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                            console.log(editor)
                            console.log(this)
                            this.slideInitialized = true;
                            //editor.resize('200', '400', true)
                        } }
                        onChange={ ( event, editor ) => {
                            this.text = editor.getData();
                            // this.props.setSlideText(data);
                        } }
                        onBlur={ editor => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ editor => {
                            console.log( 'Focus.', editor );
                        } }
                    />
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