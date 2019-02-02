import React, { Component } from 'react';   
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';

import FileEditor from '../FileEditor';
import TestIFrame from '../TestIFrame';


import api from '../../modules/api';
import history from '../../modules/history';
import {MainContext} from '../../contexts/main';

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

            courseName: "",
            
            chapterName: "",
            chapterDesc: "",

            showSlide: true,
            currentSlideId: -1,
            slides: [
            ],

            showAnswer: false,

            files: {

            },
            directory: { // directory structure
                children: [
                ]
            }   
        }
        this.fileEditor = React.createRef();
    }

    componentDidMount(){
        /**
         * Requirement
         *  CourseContent Rendering
         *      this.state.contents
         */

        this.openIntro();
        // chapter
        api.get(`/api/chapter/?u=${this.state.courseId}&c=${this.state.chapterId}`).then(api.parseJson)
        .then(response => {
            if (response && response[0]) {
                response = response[0]
                this.setState({
                    courseName: response.root,
                    chapterName: response.title,
                    chapterDesc: response.description
                })
            }
        })
        

        //slides
        //
        //id: this.state.courseId,
        //cid: this.state.chapterId
        //
        axios.get(`/slide/?id=${this.state.courseId}&cid=${this.state.chapterId}`).then(response => {
            // console.log(response.data)
            let s = []
            for(let t of response.data){
                s.push(t.context)
            }
            this.setState({slides: s})
            // console.log("oioio",s)
        }).catch(e => console.log(e))


        // dirtree
        api.ex_post('/api/usercoursetree/',{
            url: `/Course/${this.state.courseId}/`,
        }).then(api.parseJson).then(response => {
            if (!response) return;
            console.log(response)
            this.fileEditor.current.importFiles(response);
            this.fileEditor.current.importDir(response);
            this.setState({files: this.state.files})
        });
    }



    showSlide = () => {
        this.setState({showSlide: true});
    }
    hideSlide = () => {
        this.setState({showSlide: false});
    }

    onClickSlideHeader = e => {
        if (this.state.showAnswer) {
            this.hideAnswer();
        } else {
            this.openIntro();
        }
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
    
    goToChaper = (v) => {
        let cid = parseInt(this.state.chapterId) + parseInt(v);
        if (v >= 0) {
            history.push(`/course/${this.context.uid}/${this.state.courseId}/${cid}`);
        }
    }
    showAnswer = (v) => {
        this.setState({showAnswer: true});
    }
    hideAnswer = (v) => {
        this.setState({showAnswer: false});
    }

    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["header"]}>
                    <div className={styles["header-title"]}>
                        <div><Link to={`/course/${this.context.uid}/${this.state.courseId}`}>{this.state.courseName}</Link></div>
                        <div style={{margin: "0 1em"}}>/</div>
                        <div>{this.state.chapterName}</div>
                    </div>
                    <div className={styles["header-controls"]}>
                        <div className={styles["header-controls-ans"]} onClick={() => {this.showSlide(); this.showAnswer();}}>答えを見る</div>
                        <div className={styles["header-controls-btn"]} onClick={() => this.goToChaper(-1)}>前のチャプター</div>
                        <div className={styles["header-controls-btn"]} onClick={() => this.goToChaper(1)}>次のチャプター</div>
                    </div>
                </div>


                <div className={styles["editor-container"]}>
                    <div className={styles["slide-collapsed"]} onClick={this.showSlide}>
                        <span className={styles["slide-collapsed-btn"]}><SlideIcon /></span>
                        <span>スライド</span>
                    </div>
                    <div className={styles["slide-container"]} style={{display: this.state.showSlide ? "" : "none"}}>
                        <div className={styles["slide-header"]}>
                            <span className={styles["slide-header-title"]} onClick={this.onClickSlideHeader}>{this.state.showAnswer ? "答え" : "スライド"}</span>
                            <span><SlideIcon /></span>
                            <span className={styles["slide-header-collapse-btn"]} onClick={this.hideSlide}><PrevIcon/></span>
                        </div>

                        <div className={styles["slide-answer"]} style={{display: this.state.showAnswer ? "" : "none"}}>
                            <TestIFrame fontSize={1} content={this.state.slides && this.state.slides[this.state.currentSlideId] || ""} />
                            <div className={styles["slide-answer-close"]} onClick={this.hideAnswer}>
                                閉じる
                            </div>
                        </div>
                        
                        <div className={styles["slide-intro"]} style={{display: this.state.currentSlideId === -1 && !this.state.showAnswer ? "" : "none"}}>
                            <div className={styles["slide-intro-name"]}>
                                チャプター {parseInt(this.state.chapterId)}: {this.state.chapterName}
                            </div>
                            <div className={styles["slide-intro-desc"]}>
                                {this.state.chapterDesc}
                            </div>
                            <div className={styles["slide-intro-start"]} onClick={this.toFirstSlide}>
                                開始
                            </div>
                        </div>
                        

                        <div className={styles["slide-content"]} style={{display: this.state.currentSlideId === -1 || this.state.showAnswer ? "none" : ""}}>
                            <TestIFrame fontSize={1} content={this.state.slides && this.state.slides[this.state.currentSlideId] || ""} />
                        </div>
                        <div className={styles["slide-controls"]} style={{display: this.state.currentSlideId === -1 || this.state.showAnswer ? "none" : ""}}>
                            <div className={styles["slide-controls-icon"]} onClick={this.toFirstSlide}><FirstIcon /></div>
                            <div className={styles["slide-controls-icon"]} onClick={this.toPrevSlide}><PrevIcon style={{width: "2.5em", height: "2.5em"}}/></div>
                            <div className={styles["slide-controls-num"]}>
                                <span style={{fontSize: "2em"}}>
                                    {this.state.slides.length === 0 || this.state.currentSlideId === -1 ? 0 : this.state.currentSlideId + 1}
                                </span>
                                <sub style={{fontSize: "1.4em"}}>
                                    /{this.state.slides.length}
                                </sub>
                            </div>
                            <div className={styles["slide-controls-icon"]} onClick={this.toNextSlide}><NextIcon style={{width: "2.5em", height: "2.5em"}} /></div>
                            <div className={styles["slide-controls-icon"]} onClick={this.toLastSlide}><LastIcon /></div>
                        </div>
                    
                    
                    </div>
                    
                   <FileEditor ref={this.fileEditor} courseId={this.state.courseId} />
                </div>  
            </div>
        );
  	}
}

CourseGet.propTypes = {};
CourseGet.contextType = MainContext;


export default CourseGet;