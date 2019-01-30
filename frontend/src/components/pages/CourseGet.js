import React, { Component } from 'react';   
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';

import TextEditor from '../TextEditor';
import DirTree from '../DirTree';
import TestIFrame from '../TestIFrame';


import api from '../../modules/api';
import styles from './CourseGet.module.css';

import { ReactComponent as PrevIcon } from '../../img/arrow-back.svg';
import { ReactComponent as NextIcon } from '../../img/arrow-right.svg';
import { ReactComponent as FirstIcon } from '../../img/first-page.svg';
import { ReactComponent as LastIcon } from '../../img/last-page.svg';
import { ReactComponent as SlideIcon } from '../../img/slideshow.svg';



class CourseGet extends Component {
    state = {
        contents: ""
    }

    constructor (props) {
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            chapterId: this.props.match.params.ch,

            courseName: "coursename",
            
            chapterName: "chaptername",
            chapterDesc: "chapterdesc",

            showSlide: false,
            currentSlideId: -1,
            slides: [
                "slide11",
                "slide22",
                "slide33",
            ],

            files: {

            },
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

        this.openIntro();

        axios.post('/getusercourseindex/', {
            id: this.state.courseId,
            cid: this.state.chapterId
        }).then(response => {
            console.log(response.data)
            this.setState({contents: response.data})
        }).catch(e => console.log(e))

        let u = '/getCourseInfoContentsInfo/' + this.props.match.params.id
        axios.get(u).then(response => {
            this.setState({chapters: response.data})
        }).catch(e => console.log(e))
    }

    showSlide = () => {
        this.setState({showSlide: true});
    }
    hideSlide = () => {
        this.setState({showSlide: false});
    }

    openIntro = () => {
        this.setState({currentSlideId: -1});
    }

    changeSlide = (id) => {
        id = Math.max(0, Math.min(this.state.slides.length - 1, id));
        this.setState({currentSlideId: id});
    }
    toFirstSlide = () => {
        this.changeSlide(0);
    }
    toLastSlide = () => {
        this.changeSlide(this.state.slides.length - 1);
    }
    toPrevSlide = () => {
        this.changeSlide(this.state.currentSlideId - 1);
    }
    toNextSlide = () => {
        this.changeSlide(this.state.currentSlideId + 1);
    }


    /* file */
    findFile = (path) => {
        if (path == "/") { // root
            return { parent: null, file: this.state.directory, index: 0 };
        }

        const tree = path.split('/')
        tree.shift();
        
        let index = 0;
        let file = null;
        let parent = this.state.directory;

        while (parent.children && parent.children.length > 0) {
            index = parent.children.findIndex((v) => v.name == tree[0]);
            file = parent.children[index];
            if (!file) return null;

            tree.shift();
            if (tree.length == 0) break;
            parent = file;
        }
        return { parent, file, index };
    }


    createDir = (path, name, isFolder) => {
        const data = this.findFile(path);
        if (!data || !data.file || !data.file.children) return; // folder のみ

        const dup = data.file.children.find((v) => v.name == name);
        if (dup) {
            console.log("同じ名前のファイルが存在します:", name);
            return;
        }

        data.file.children.push({
            name: name,
            children: isFolder && []
        });
        this.setState({directory: this.state.directory});
    }
    renameDir = (path, name) => {
        const data = this.findFile(path);
        if (!data) return;

        this.updateTabName(path, name); // TextEditor も更新

        data.file.name = name;
        this.setState({directory: this.state.directory});
    }
    deleteDir = (path) => {
        const data = this.findFile(path);
        if (!data || !data.parent) return;
        
        data.parent.children.splice(data.index, 1);
        this.setState({directory: this.state.directory});
    }
    copyDir = (from, to) => {

    }

    updateTabName = (path, name) => {
        this.window.current.renameTab(path, name);
    }
    getContent = (path) => {
        return this.state.files[path];
    }
    onSaveTab = () => {

    }

    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["header"]}>
                    <div className={styles["header-title"]}>
                        <div><Link to={`/course/${this.state.courseId}`}>{this.state.courseName}</Link></div>
                        <div>/</div>
                        <div><Link to={`/course/${this.state.courseId}/${this.state.chapterId}`}>{this.state.chapterName}</Link></div>
                    </div>
                    <div className={styles["header-controls"]}>
                        <div className={styles["header-controls-ans"]}>答えを見る</div>
                        <div className={styles["header-controls-btn"]}>前のチャプター</div>
                        <div className={styles["header-controls-btn"]}>次のチャプター</div>
                    </div>
                </div>


                <div className={styles["editor-container"]}>
                    <div className={styles["slide-collapsed"]} onClick={this.showSlide}>
                        <span className={styles["slide-collapsed-btn"]}><SlideIcon /></span>
                        <span>スライド</span>
                    </div>
                    <div className={styles["slide-container"]} style={{display: this.state.showSlide ? "" : "none"}}>
                        <div className={styles["slide-header"]}>
                            <span className={styles["slide-header-title"]} onClick={this.openIntro}>スライド</span>
                            <span><SlideIcon /></span>
                            <span className={styles["slide-header-collapse-btn"]} onClick={this.hideSlide}><PrevIcon/></span>
                        </div>
                        <div className={styles["slide-intro"]} style={{display: this.state.currentSlideId == -1 ? "" : "none"}}>
                            <div className={styles["slide-intro-name"]}>
                                チャプター {parseInt(this.state.chapterId) + 1}: {this.state.chapterName}
                            </div>
                            <div className={styles["slide-intro-desc"]}>
                                {this.state.chapterDesc}
                            </div>
                            <div className={styles["slide-intro-start"]} onClick={this.toFirstSlide}>
                                開始
                            </div>
                        </div>
                        <div className={styles["slide-content"]} style={{display: this.state.currentSlideId == -1 ? "none" : ""}}>
                            <TestIFrame fontSize={1} content={this.state.slides && this.state.slides[this.state.currentSlideId] || "test"} />
                        </div>
                        <div className={styles["slide-controls"]} style={{display: this.state.currentSlideId == -1 ? "none" : ""}}>
                            <div className={styles["slide-controls-icon"]} onClick={this.toFirstSlide}><FirstIcon /></div>
                            <div className={styles["slide-controls-icon"]} onClick={this.toPrevSlide}><PrevIcon style={{width: "2.5em", height: "2.5em"}}/></div>
                            <div className={styles["slide-controls-num"]}>
                                <span style={{fontSize: "2em"}}>
                                    {this.state.currentSlideId + 1}
                                </span>
                                <sub style={{fontSize: "1.4em"}}>
                                    /{this.state.slides.length}
                                </sub>
                            </div>
                            <div className={styles["slide-controls-icon"]} onClick={this.toNextSlide}><NextIcon style={{width: "2.5em", height: "2.5em"}} /></div>
                            <div className={styles["slide-controls-icon"]} onClick={this.toLastSlide}><LastIcon /></div>
                        </div>
                    </div>
                    
                    <div className={styles["dirtree-container"]}>
                        {/*
                        */}
                        <DirTree dir={this.state.directory}
                            onOpenFile={path => {this.window.current.openTab(path);}}
                            rename={this.renameDir}
                            delete={this.deleteDir}
                            copy={this.copyDir}
                            create={this.createDir}                
                        />
                    </div>
                    <div className={styles["textditor-container"]}>
                        <TextEditor ref={this.window} run={this.props.runterminal}/>
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