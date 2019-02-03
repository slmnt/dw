import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Editor.module.css';

import FileEditor from '../FileEditor';
import TestIFrame from '../TestIFrame';

import 'highlight.js/styles/vs.css'
import hljs from 'highlight.js';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import cookie from 'cookie';

import {MainContext} from '../../contexts/main';
import api from '../../modules/api'
import history from '../../modules/history';

import logo from '../../img/logo.svg';

import { ReactComponent as EditIcon } from '../../img/edit.svg';
import { ReactComponent as DragHandleIcon } from '../../img/drag-handle.svg';
import { ReactComponent as AddIcon } from '../../img/add.svg';
import { ReactComponent as CrossIcon } from '../../img/cross.svg';
import { ReactComponent as ThreeDots } from '../../img/three-dots.svg';
import { ReactComponent as DeleteIcon } from '../../img/delete.svg';

import { ReactComponent as SlideIcon } from '../../img/align-left.svg';
import { ReactComponent as CodeIcon } from '../../img/code.svg';
import { ReactComponent as AnsIcon } from '../../img/spellcheck.svg';

/*
問題
  highlight.js の language auto detection
  katex の render
*/

// highlight.js
window.hljs = hljs;
hljs.configure({
  languages: ['javascript', 'ruby', 'python'],
  useBR: false,
});
//
class TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  setValue = (value) => {
    this.input.current.value = value;
  }
  getValue = () => {
    return this.input.current.value;
  }
  onInput = e => {
    if (this.props.onUpdate) this.props.onUpdate(e.currentTarget.value);
  }
  render() {
    return (
      <div className={styles["textbox-container"]}>
        <input type="text" className={classNames(styles.textbox)} onInput={this.onInput} ref={this.input} />
        <EditIcon style={{position: "absolute", right: "0", pointerEvents: "none"}} />
      </div>
    )
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  setValue = (value) => {
    this.input.current.value = value;
  }
  getValue = () => {
    return this.input.current.value;
  }
  onInput = e => {
    if (this.props.onUpdate) this.props.onUpdate(e.currentTarget.value);
  }
  render() {
    return (
      <div className={styles["textarea-container"]}>
        <textarea type="text" className={classNames(styles.textarea)} onInput={this.onInput} ref={this.input} />
      </div>
    )
  }
}

class SlideEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxHeight: 70,
      draggingBox: null, //参照
      boxInitialPos: null,
      selectingBox: null,
    }
    this.text = "";
  }
  editorRef(element) {
    /* quill.js
      https://github.com/quilljs/quill/blob/develop/docs/_includes/standalone/full.html
      
      buildButtons():  button を作成
        ql-*
      buildPickers(), fillSelect():  picker を作成
        var ALIGNS = [false, 'center', 'right', 'justify'];
        var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
        var FONTS = [false, 'serif', 'monospace'];
        var HEADERS = ['1', '2', '3', false];
        var SIZES = ['small', false, 'large', 'huge'];
    */
   /* old options
      toolbar: [
          [
            {font: []},
            {size: ['small', false, 'large', 'huge']}
          ],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            {color: []},
            {background: []}
          ],
          [
            {script: 'sub'},
            {script: 'super'}
          ],
          [
            {list: 'ordered' }, { list: 'bullet' },
            {indent: '-1'}, {indent: '+1'}
          ],
          [
            {direction: 'rtl'},
            {align: ['center', 'right', 'justify']}
          ],
          ['blockquote', 'code', 'code-block'],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
   */
    /*
    var quill = new Quill(element, {
      modules: {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
        ],
        markdownShortcuts: {},
        syntax: hljs,
      },
      placeholder: 'ここに記入してください...',
      bounds: "#editorContainer",
      theme: 'snow'
    });
    */
  }

  getBoxPos(el, localX, localY) {
    let rect = el.getBoundingClientRect();
    let ly = localY - rect.y;
    return parseInt(ly / this.state.boxHeight);
  }
  getBox(pos) {
    if (!this.props.currentChapter) return;
    for (let v of this.props.currentChapter.slides) {
      if (v.pos === pos) return v;
    }
  }
  getText = () => {
    return this.text;
  }

  onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('slide', 123);

    let pos = this.getBoxPos(e.currentTarget, 0, e.clientY);

    let box = this.getBox(pos);
    console.log(pos)
    if (box) {
      this.draggingBox = box;
    }
  }
  onDrop = (e) => {
    if (!e.dataTransfer.getData('slide')) return;
    e.preventDefault();
    if (!this.draggingBox) return;

    let pos = this.getBoxPos(e.currentTarget, 0, e.clientY);
    if (pos != this.lastPos || this.draggingBox != this.lastBox) {
      this.props.moveBox(this.draggingBox.pos, pos);
    }
  }
  onDragOver = (e) => {
    e.preventDefault();
  }

  onOpenSlide = slide => {
    this.setState({selectingBox: slide});
  }

  clickSlide = (slide) => {
    this.props.openSlide(slide);
  }


  render() {
    return (
      <div className={styles["slides-main-container"]}>
        <div className={styles["slides-side-container"]}>
          <div className={styles["slides-side-header"]}>
            <div>スライド一覧 ({this.props.currentChapter && this.props.currentChapter.slides.length})</div>
            <AddIcon className={styles["slides-side-header-icon"]} onClick={this.props.addBlankSlide} style={{marginLeft: "auto"}} />
            <DeleteIcon className={styles["slides-side-header-icon"]} onClick={() => this.props.removeSlide(this.state.selectingBox)} style={{marginLeft: "0.5em"}} />
          </div>
          <div className={styles["slides-side"]} style={{position: "relative"}}
            onDragOver={this.onDragOver}
            onDragStart={this.onDragStart}
            onDrop={this.onDrop}
          >
            {
              this.props.currentChapter && this.props.currentChapter.slides.map((v,i) => {
                return (<div key={i}
                  className={styles["slides-side-element"]}
                  draggable
                  style={{
                    height: this.state.boxHeight + "px",
                    top: v.pos * this.state.boxHeight + "px",
                    borderWidth: this.state.selectingBox == v ? "2px 1px" : "0 0 1px 0",
                    borderColor: this.state.selectingBox == v ? "var(--main-color)" : "var(--light-color)",
                    zIndex: this.draggingBox === v ? 1 : 0
                  }}
                  onClick={() => {this.clickSlide(v)}}
                >
                  <div style={{width: "100%", height: "100%"}}>
                    <div className={styles["slides-side-element-number"]}>
                      {v.pos + 1}
                    </div>
                    <div className={styles["slides-side-element-info"]}>
                      {/*
                      <div className={styles["slides-side-element-name"]}>{v.name}</div>
                      <div className={styles["slides-side-element-text"]}>{v.text}</div>
                      */}
                      <TestIFrame content={v.text} ignoreEvents={true}/>
                    </div>
                  </div>
                </div>);
              })

            }
          </div>
        </div>

        <div className={styles["slides-main-container-2"]}>
          <div className={styles["slides-main"]} style={{ backgroundImage: "url(" + logo + ")" }}>
            <div style={{width: "100%", height: "100%"}}>
              {/*
              <div className={styles["slides-header"]}>
                <div className={styles["slides-header-control"]}>
                  <div><div>Markdown</div></div>
                </div>
              </div>
              */}
              <div className={styles["slide-editor"]}
                style={{
                  opacity: this.props.currentSlide ? "1" : "0"
                }}
              >
                {/*
                <div ref={this.editorRef}>
                </div>
                */}
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.props.currentSlide && this.props.currentSlide.text}
                    config={{
                      height: "550px",
                      width: "100%",
                      fullPage: false,
                      autoGrow_maxHeight: "100%",
                      resize_enabled: true,
                      resize_minWidth: 200,
                      resize_minHeight: 400,
                      resize_dir: 'vertical',
                      //removePlugins: 'size,autogrow',
                    }}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                        //console.log(editor)
                        //console.log(this)
                        //editor.resize('200', '400', true)
                      } }
                    onChange={ ( event, editor ) => {
                      this.slideInitialized = true;
                      this.text = editor.getData();
                      // this.props.setSlideText(data);
                    } }
                    onBlur={ editor => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        //console.log( 'Focus.', editor );
                    } }
                />
              </div>
                {/*
                <TestIFrame content={`
                  <html><body>
                  <style>.po {width: 100%; height: 100%; background-color: blue;} </style>
                  <h1>hellonfj</h1>
                  <div class="po"></div>
                  </body></html>
                `} />
                */}
              </div>
            </div>
          <div className={styles["slides-footer"]}>
            FOOTEER
          </div>
        </div>
      </div>
    )
  }

}

//
class Editor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      course: {
        name: "",
        desc: "",
      },
      chapters: [
        /*{
          name: "Chapter01",
          desc: "",
          slides: [
            {
              text: "Pleas Input something this area",
              pos: -1
            }
          ]
        }*/
      ],
      currentChapter: null,
      currentSlide: null,
      currentTab: 0,

      showChapterMenu: false,
      chapterMenuConfig: -1
      
    }

    this.courseNameInput = React.createRef();
    this.chapterNameInput = React.createRef();
    //this.chapterDescInput = React.createRef();
    this.chapterMenuNameInput = React.createRef();
    this.chapterMenuDescInput = React.createRef();

    this.slideEditor = React.createRef();
    this.fileEditor = React.createRef();

  }

  componentDidMount() {
    this.loadCourse(this.state.course); // テスト test
    
    this.slideUpdateTimer = window.setInterval(this.applySlideChanges, 1000); // 1秒に一回更新


    // course
    var u = `/course/?id=${this.state.id}`;
    axios.get(u).then(response => {
      // Course
      /*
      createat: "2019-01-30T18:26:26.755470+09:00"
      descriptoin: "desc"
      id: 31
      likes: 0
      root: "adminuser"
      title: "testcoure"
      users: 0
      */
      this.setCourseData(response.data.title, response.data.description)
    }).catch(e => console.log(e))


    // chapter & slides
    let chapters = []
    u = `/chapter/?u=${this.state.id}`
    axios.get(u).then(response => {
      // chapters
      chapters = response.data

      let newChapters = [];

      let slidePms = [];
      for(let c of chapters){
        /* cid, description, title, createat */
        let ch = {};
        ch.name = c.title;
        ch.desc = c.descriptoin;
        ch.slides = [];
        newChapters.push(ch);
    
        //slides
        //id: this.state.id,
        //cid: c.cid
        //
        slidePms.push(
          axios.get(`/slide/?id=${this.state.id}&cid=${c.cid}`).then(response => {
            if (!ch) {
              console.log();
              return;
            }
            for (let s of response.data) {
              ch.slides.push({
                text: s.context,
                pos: -1
              });
            }
            return ch;
          }).catch(e => console.log(e))
        );
      }

  
      Promise.all(slidePms).then(response => {
        if (newChapters.length === 0) {
          newChapters.push({
            name: "テストチャプター",
            desc: "テスト",
            slides: []
          })
        }
        this.loadChapters(newChapters);
        this.state.chapters = newChapters;
        this.setState({chapters: this.state.chapters}, () => {
          this.openChapter(this.state.chapters[0]);
        });
      });
    }).catch(e => console.log(e))



    // dirtree
    api.ex_post('/api/usercoursetree/',{
      url: `/Course/${this.state.id}/`,
    }).then(api.parseJson).then(response => {
        if (!response) return;
        console.log(response)
        this.fileEditor.current.importFiles(response);
        this.fileEditor.current.importDir(response);
    });


  }
  componentWillUnmount(){
    window.clearInterval(this.slideUpdateTimer);
  }


  getTabValue = (path) => {
    return this.fileEditor.current.getTabValue(path);
  }
  

  onSave = async (e) => {
    let base_url = "Course/" + this.state.id
    var chapters = this.state.chapters
    
    // sort slides
    this.sortSlides();

    // course
    await api.ex_post('/api/updatecourse/',{
      'id': this.state.id,
      'title': this.state.course.name,
      'desc': this.state.course.desc
    }).then(api.parseJson)
    .then(response => console.log())
    .catch(error => console.error('Error:', error))

    // chapter & slide
    let idx = 0
    for(let c of chapters){
      idx += 1
      let jdx = 0
      let slides = c.slides
      //at this point, craete chapter
      //name, desc
      let c2 = await api.ex_post('/api/chapter/',{
        'id': this.state.id,
        'cid':idx,
        'title':c.name,
        'desc':c.desc
      })
      
      for(let s of slides){
        //name, text,idx,jdx,id
        jdx += 1
         let s2 = await api.ex_post('/api/slide/',{
            id: this.state.id,
            cid: idx,
            sid: jdx,
            title: s.name,
            context: s.text          
        })
      }
    }

    await this.fileEditor.current.uploadFiles(base_url)
    
    history.push(`/course/${this.context.uid}/${this.state.id}`);
  }  

  moveBox = (from, to) => {
    if (!this.slideEditor.current.getBox(to)) return;

    let target = this.slideEditor.current.getBox(from);
    let forward = from < to;
    let p = forward ? -1 : 1;
    for (let v of this.state.currentChapter.slides) {
      if (forward ? v.pos >= from && v.pos <= to : v.pos >= to && v.pos <= from) v.pos += p;
    }
    target.pos = to;
    this.lastPos = to;
    this.lastBox = target;

    this.setState({chapters: this.state.chapters})
  }

  loadCourse = (data) => {
    //
    this.setCourseData(data.name, data.desc);
  }
  loadChapters = (chapters) => {
    for (let ch of chapters) {
      this.loadSlides(ch.slides);
    }

    this.setState({
      chapters: chapters,
    }, () => {
      if (this.state.chapters[0]){
        this.openChapter(this.state.chapters[0]);
        this.openSlide(this.state.chapters[0].slides[0]);
      }
    })
  }
  loadSlides = (slides) => {
    for (let i in slides) {
      slides[i].pos = parseInt(i);
    }
  }
  openChapter = (chapter) => {
    if (!chapter) return;
    this.setState({currentChapter: chapter}, () => {
      //this.chapterNameInput.current.value = chapter.name;
      this.setChapterNameText(chapter.name);

      const c = this.getSlide(0);
      this.openSlide(c); // slide がない場合もそのまま
    });
  }
  openSlide = (slide) => {
    this.applySlideChanges();
    this.setState({currentSlide: slide}, () => {
    });
    this.slideEditor.current.onOpenSlide(slide);
  }
  openTab = (id) => {
    this.setState({currentTab: id});
  }

  openChapterMenu = () => {
    this.setState({showChapterMenu: true, chapterMenuConfig: -1});
  }
  closeChapterMenu = () => {
    this.setState({showChapterMenu: false});
  }
  
  openChapterMenuCfg = (id) => {
    const ch = this.getChapter(id);
    if (!ch) return;
    this.setState({chapterMenuConfig: id});
    this.chapterMenuNameInput.current.setValue(ch.name);
    this.chapterMenuDescInput.current.setValue(ch.desc);
  }
  closeChapterMenuCfg = () => {
    this.setState({chapterMenuConfig: -1});
  }

  // 
  updateCourseState = () => {
    this.setState({course: this.state.course});
  }

  // course
  setCourseName = name => {
    if (!this.state.course) return;
    this.state.course.name = name;
    this.setState({course: this.state.course});
  }
  setCourseData = (name, desc) => {
    this.state.course.name = name;
    this.state.course.desc = desc;
    this.setState({course: this.state.course});

    this.courseNameInput.current.setValue(this.state.course.name);
  }

  // chapter
  getChapter = id => {
    return this.state.chapters[id];
  }
  setChapterName = name => {
    if (!this.state.currentChapter) return;
    this.state.currentChapter.name = name;
    this.setState({chapters: this.state.chapters});
  }
  setChapterDesc = desc => {
    if (!this.state.currentChapter) return;
    this.state.currentChapter.desc = desc;
    this.setState({chapters: this.state.chapters});
  }
  setChapterNameText = name => {
    this.chapterNameInput.current.setValue(name);
  }
  saveChapterMenuCfg = () => {
    const ch = this.getChapter(this.state.chapterMenuConfig);
    if (!ch) return;
    ch.name = this.chapterMenuNameInput.current.getValue();
    ch.desc = this.chapterMenuDescInput.current.getValue();
    if (ch == this.state.currentChapter) this.setChapterNameText(ch.name);
    this.setState({chapters: this.state.chapters});
  }

  addBlankChapter = () => {
    this.state.chapters.push({
      name: "チャプター",
      desc: "",
      slides: []
    });
    this.setState({chapters: this.state.chapters});
  }
  removeChapter = (ch) => {    
    let id = typeof ch === 'number' ? ch : this.state.chapters.indexOf(ch);
    let currentId = this.state.chapters.indexOf(this.state.currentChapter);
    this.state.chapters.splice(id, 1);

    this.setState({chapters: this.state.chapters}, ch === currentId && (() => {
      const c = this.getChapter(0);
      if (c) this.openChapter(c);
    }) || undefined);
  }
  moveChapter = (from, to) => {
    if (!this.state.chapters[to]) return;
    if (!this.state.chapters[from]) return;

    from = parseInt(from);
    to = parseInt(to);

    let clone = this.state.chapters.map((v, i) => i);

    let forward = from < to;
    let p = forward ? -1 : 1;
    for (let i in clone) {
      if (forward ? clone[i] >= from && clone[i] <= to : clone[i] >= to && clone[i] <= from) clone[i] += p;
    }
    clone[from] = to;

    
    const w = Array.from(this.state.chapters);
    for (let i in clone) {
      this.state.chapters[clone[i]] = w[i];
    }

    this.setState({chapters: this.state.chapters})
  }

  // slide
  getSlide = id => {
    return this.state.currentChapter && this.state.currentChapter.slides[id];
  }
  setSlideText = text => {
    if (!this.state.currentSlide) return;
    this.state.currentSlide.text = text;
    this.setState({chapters: this.state.chapters});
  }
  addBlankSlide = () => {
    if (!this.state.currentChapter) return;
    if (this.state.currentChapter.slides.length > 30) {
      alert("スライドの最大枚数突破\nスライドは30枚までです。")
      console.log("スライドの最大枚数突破");
      return;
    }
    this.state.currentChapter.slides.push({
      name: "スライド",
      text: "",
      pos: this.state.currentChapter.slides.length
    });
    this.setState({chapters: this.state.chapters});
  }
  removeSlide = (slide) => {
    if (!this.state.currentChapter) return;
    
    let id = typeof slide === 'number' ? slide : this.state.currentChapter.slides.indexOf(slide);
    let currentId = this.state.currentChapter.slides.indexOf(this.state.currentSlide);
    this.state.currentChapter.slides.splice(id, 1);
    
    this.setState({chapters: this.state.chapters}, () => {
      if (slide == currentId) {
        const c = this.getSlide(0);
        this.openSlide(c); 
      }

      this.sortSlides();
      this.applySlideChanges();
    });
  }
  applySlideChanges = () => {
    if (!this.slideEditor || !this.state.currentSlide || !this.slideEditor.current.slideInitialized) return;

    const text = this.slideEditor.current.getText();
    //console.log("init: ", this.slideEditor.current.slideInitialized)
    //console.log(text)
    if (text != this.state.currentSlide.text) this.setSlideText(text);
  }
  sortSlides = () => {
    if (!this.state.currentChapter) return;
    let slides = this.state.currentChapter.slides;
    slides.sort(function (a, b) {
      return a.pos - b.pos;
    });
    for (let i in slides) {
      slides[i].pos = parseInt(i);
    }
    this.setState({chapter: this.state.chapter});
  }


  onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('chapter', e.currentTarget.dataset["chapter"]);

    /*
    let pos = this.getBoxPos(e.currentTarget, 0, e.clientY);

    let box = this.getBox(pos);
    if (box) {
      this.draggingBox = box;
    }
    */
  }
  onDrop = (e) => {
    if (!e.dataTransfer.getData('chapter')) return;
    e.preventDefault();

    const from = e.dataTransfer.getData('chapter');
    const to = e.currentTarget.dataset["chapter"];

    this.moveChapter(from, to);
    /*
    if (!this.draggingBox) return;

    let pos = this.getBoxPos(e.currentTarget, 0, e.clientY);
    if (pos != this.lastPos || this.draggingBox != this.lastBox) {
      this.props.moveBox(this.draggingBox.pos, pos);
    }
    */
  }
  onDragOver = (e) => {
    e.preventDefault();
  }



  render() {
    return (
      <div style={{height: "100%"}}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles["course-header"]}>
              <div className={styles["course-btn"]} onClick={() => this.openChapterMenu()}>コース編集</div>
              <div className={styles["course-name"]}>
                <TextBox ref={this.courseNameInput} onUpdate={v => this.setCourseName(v)}/>
              </div>
            </div>
            <div className={styles["header-controls"]}>
              <div className={styles["discard-btn"]}><Link to={`/course/${this.context.uid}/${this.state.id}`}>キャンセル</Link></div>
              {/*
              <div className={styles["preview-btn"]}><span>プレビュー</span></div>
              */}
              <div className={styles["save-btn"]} onClick={this.onSave} ><span>保存</span></div>
            </div>
          </div>
          <div className={styles["middle-header"]}>
            <div className={styles.tablist}>
              <div className={this.state.currentTab === 0 ? styles["tabitem-selected"] : ""} onClick={() => this.openTab(0)}>
                スライド
                <SlideIcon />
              </div>
              <div className={this.state.currentTab === 1 ? styles["tabitem-selected"] : ""} onClick={() => this.openTab(1)}>
                コード
                <CodeIcon />
              </div>
              <div className={this.state.currentTab === 2 ? styles["tabitem-selected"] : ""} onClick={() => this.openTab(2)}>
                答え
                <AnsIcon />
              </div>
            </div>
            <div className={styles["chapter-header"]}>
              <div className={styles["chapters-btn"]} onClick={() => this.openChapterMenu()}>
                チャプター編集
              </div>
              <div className={styles["chapter-name"]}>
                <TextBox ref={this.chapterNameInput} onUpdate={v => this.setChapterName(v)} />
              </div>
            </div>
            <div className={styles["chapter-menu-container"]} style={{display: this.state.showChapterMenu ? "block" : "none"}}>
              <div className={styles["chapter-menu"]}>
                <div style={{display: this.state.chapterMenuConfig !== -1 ? "block" : "none"}}>
                  <div className={styles["chapter-menu-header"]}>
                    <div className={styles["chapter-menu-header-main"]}>
                      チャプター編集
                    </div>
                    <div className={styles["chapter-menu-header-controls"]}>                
                      <div className={styles["chapter-menu-header-item"]} onClick={this.closeChapterMenuCfg} style={{display: this.state.chapterMenuConfig !== -1 ? "block" : "none"}}>
                        戻る
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles["chapter-menu-cfg"]}>
                    <div>名前</div>
                    <div className={styles["chapter-menu-cfg-name"]}>
                      <TextBox ref={this.chapterMenuNameInput} />
                    </div>
                    <div style={{marginTop: "1em"}}>説明</div>
                    <div className={styles["chapter-menu-cfg-desc"]}>
                      <TextArea ref={this.chapterMenuDescInput}/>
                    </div>
                    <div className={styles["chapter-menu-cfg-footer"]}>
                      <div className={styles["chapter-menu-cfg-footer-btn"]} onClick={() => {this.removeChapter(this.state.chapterMenuConfig); this.closeChapterMenuCfg();} }>
                        削除
                        <DeleteIcon />
                      </div>
                      <div>
                        <div className={styles["chapter-menu-cfg-footer-btn"]} onClick={this.closeChapterMenuCfg}>
                          キャンセル
                        </div>
                        <div className={classNames(styles["chapter-menu-cfg-footer-btn"], styles["chapter-menu-cfg-footer-savebtn"])} onClick={() => {this.saveChapterMenuCfg(); this.closeChapterMenuCfg();} } >
                          保存
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div style={{display: this.state.chapterMenuConfig !== -1 ? "none" : "block", minHeight: "20em"}}>
                  <div className={styles["chapter-menu-header"]}>
                    <div className={styles["chapter-menu-header-main"]}>
                      <div>チャプター 一覧</div>
                      <AddIcon className={styles["chapter-menu-header-add"]} onClick={this.addBlankChapter} style={{display: this.state.chapterMenuConfig !== -1 ? "none" : "block"}}/>
                    </div>
                    <div className={styles["chapter-menu-header-controls"]}>                
                      <div className={styles["chapter-menu-header-item"]} onClick={() => this.closeChapterMenu()}>
                        閉じる
                      </div>
                    </div>
                  </div>
                  {
                    this.state.chapters.map((v, i) => {
                      return (
                        <div key={i} className={styles["chapter-menu-item"]} draggable data-chapter={i}
                          onDragOver={this.onDragOver}
                          onDragStart={this.onDragStart}
                          onDrop={this.onDrop}
                        >
                          <DragHandleIcon className={styles["chapter-menu-icon"]} />
                          <div className={styles["chapter-menu-item-info"]} onClick={() => {this.openChapter(v); this.closeChapterMenu();} } >
                            <div className={styles["chapter-menu-item-name"]}>{i + 1}. {v.name}</div>
                            <div>スライド枚数: {v.slides.length}</div>
                          </div>
                          <ThreeDots className={styles["chapter-menu-icon"]} onClick={() => this.openChapterMenuCfg(i)}/>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles["chapter-menu-bg"]} onClick={() => this.closeChapterMenu()}>
              </div>
            </div>
          </div>
          <div className={styles["editor-container"]}>
            <div style={{backgroundColor: "var(--bg-color)", zIndex: "0"}}>
            </div>
            <div style={{zIndex: this.state.currentTab === 0 ? "1" : "-1"}} >
              <SlideEditor ref={this.slideEditor}
                currentChapter={this.state.currentChapter}
                currentSlide={this.state.currentSlide}
                moveBox={this.moveBox}
                openSlide={this.openSlide}
                setSlideText={this.setSlideText}
                addBlankSlide={this.addBlankSlide}
                removeSlide={this.removeSlide}
              />
            </div>
            <div style={{zIndex: this.state.currentTab === 1 ? "1" : "-1"}} >
              <div className={styles["file-editor-container"]}>
                <FileEditor ref={this.fileEditor} courseId={this.state.id} />
              </div>
            </div>
            <div style={{zIndex: this.state.currentTab === 2 ? "1" : "-1"}} >
              <div className={styles["answer-container"]}>
                <div className={styles["answer-title"]}>
                  答えを記入
                </div>
                <div className={styles["answer-textarea-container"]}>
                  <TextArea />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
Editor.contextType = MainContext;
export default Editor;
