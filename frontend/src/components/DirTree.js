import React from 'react';   
import { Scrollbars } from 'react-custom-scrollbars';


import styles from './DirTree.module.css';

import logo from '../img/logo.svg';
import UploadIcon from '../img/upload.svg';


class DirTree extends React.Component {
  /*
    props
      allowUpload
      onUpload()
  */
  constructor (props) {
    super(props);
    this.state = {
      fileData: {
      },
      dragging: false
    }
  }
  onToggleCollapse = (path) => {
    let s = this.state.fileData[path] && this.state.fileData[path].collapsing;
    this.state.fileData[path] = {collapsing: !s};
    this.setState({fileData: this.state.fileData});
  }
  flatten(dir) {
    // ディレクトリ階層を React element の list に変換
    let re = []; //
    let stack = []; // 親ディレクトリの一覧
    let f = d => {
      let path = stack.join("/") + "/" + d.name;
      d.name && re.push(
        <div className={styles["dir-item"]}
          key={path}
          data-filepath={path}
          style={ {
            width: "100%"
          } }
          onClick={(() => {
            if (d.children) {
              this.onToggleCollapse(path);
            } else {
              if (this.props.openFile) this.props.openFile(path);
            }
          }).bind(this)}
        >
          <div className={styles["dir-label"]} draggable>
            <span
              className={styles["dir-label-image"]}
              style={{
                marginLeft: stack.length * 1 + "em",
                backgroundImage: "url(" + (!d.children ? logo : `"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23E8E8E8' d='M11 10H5.344L11 4.414V10z'/%3E%3C/svg%3E"` ) + ")",
                transform: "rotate(" + (d.children ? this.state.fileData[path] && this.state.fileData[path].collapsing && "-45" || "0" : "0") + "deg)"
              }}
            >
            </span>
            <a className={styles["dir-label-name"]}>
              {d.name}
            </a>
          </div>
        </div>
      );
      if (!d.children || (this.state.fileData[path] && this.state.fileData[path].collapsing) ) return;
      stack.push(d.name);
      for (let v of d.children) {
        f(v);
      }
      stack.pop();
    }
    f(dir);
    return re;
  }

  onDragEnter = e => {
    e.stopPropagation();
    e.preventDefault();
  }
  onDragOver = e => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target) {
      console.log(e.target.dataset["filepath"])
    }
  }
  onDrop = e => {
    e.stopPropagation();
    e.preventDefault();
  }
  onUpload = (e) => {
    var dt = e.dataTransfer;
    var files = dt.files;
  
    var count = files.length;
    console.log("File Count: " + count + "\n");

    for (var i = 0; i < files.length; i++) {
      console.log(" File " + i + ":\n(" + (typeof files[i]) + ") : <" + files[i] + " > " +
              files[i].name + " " + files[i].size + "\n");
    }
  
  }


  onDragEnter = e => {
    e.preventDefault();
    this.setState({dragover: true});
  }
  onDragLeave = e => {
    e.preventDefault();
    this.setState({dragover: false});
  }
  onDragOver = e => {
    e.preventDefault();
  }
  onDrop = e => {
    console.log("drapp")
    e.preventDefault();
    
    const dt = e.dataTransfer;
    const files = dt.files;
    this.upload(files)
  }

  upload(files) {
    const formData = new FormData();
  
    formData.append('path', '/src/a.c');
    for (var i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }
  
    fetch('http://localhost:8000/api/upload/', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  
  }

  render() {
    return (
      <div className={styles["dir-main"]}>
          <div className={styles["dir-drop-zone"]}
            style={{
              opacity: this.state.dragover ? 1 : 0,
              backgroundImage: "url(" + UploadIcon + ")",
            }}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
          >
          </div>
          <div className={styles["dir-header"]}>ディレクトリ</div>
          <div
            className={styles["dir-window"]}
            style={ {
              width: "100%"
            } }
          >
            {
              this.flatten(this.props.dir)
            }
          </div>
      </div>
    )
  }
}

export default DirTree;

