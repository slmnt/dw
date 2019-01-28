import React from 'react';   


import styles from './DirTree.module.css';

import logo from '../img/logo.svg';
import uploadIcon from '../img/upload.svg';
import fileIcon from '../img/file.svg';

import { ReactComponent as AddIcon } from '../img/add.svg';
import { ReactComponent as CreateFolderIcon } from '../img/create-folder.svg';

import api from '../modules/api';



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
      dragging: false,
      
      showContextMenu: false,
      contextTarget: null,

      copyFrom: null,

      showRenameBox: false,
      renamingPath: null,
    }
    this.menu = [
      ["新しいファイル", () => {
        this.createNew(this.state.contextTarget, "新しいファイル");
        this.closeContextMenu();
      }],
      ["新しいフォルダ", () => {
        this.createNew(this.state.contextTarget, "新しいフォルダ", true);
        this.closeContextMenu();
      }],
      ["コピー", () => {
        this.setCopyFrom(this.state.contextTarget);
        this.closeContextMenu();
      }],
      ["貼り付け", () => {
        this.copy(this.state.copyFrom, this.state.contextTarget);
        this.closeContextMenu();
      }],
      ["名前変更", () => {
        this.enableRenameBox(this.state.contextTarget);
        this.closeContextMenu();
      }],
      ["削除", () => {
        this.delete(this.state.contextTarget);
        this.closeContextMenu();
      }],
    ];
    this.contextMenu = React.createRef();
    this.renameBox = React.createRef();
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
              if (this.props.onOpenFile) this.props.onOpenFile(path);
            }
          }).bind(this)}
        >
          <div className={styles["dir-label"]} draggable>
            <span
              className={styles["dir-label-image"]}
              style={{
                marginLeft: stack.length * 1 + "em",
                backgroundImage: "url(" + (!d.children ? fileIcon : `"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23E8E8E8' d='M11 10H5.344L11 4.414V10z'/%3E%3C/svg%3E"` ) + ")",
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
    console.log(e.dataTransfer)
    this.setState({dragover: true});
  }
  onDragLeave = e => {
    if (e.target != e.currentTarget) return;
    e.preventDefault();
    this.setState({dragover: false});
  }
  onDragOver = e => {
    e.preventDefault();
  }
  onDrop = e => {
    console.log("drapp")
    e.preventDefault();
    
    const item = e.target.closest("[data-filepath]");
    const path = item && item.dataset["filepath"];


    const dt = e.dataTransfer;
    const files = dt.files;
    //this.upload(files)

    this.setState({dragover: false});
  }

  onDropItem = () => {

  }
  onDropFile = e => {
    this.upload(e.dataTransfer.files);
  }

  upload(files) {
    const formData = new FormData();
  
    formData.append('path', '/src/a.c');
    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    api.post('/api/upload/', {
      body: formData,
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  
  }


  /* context menu */
  openContextMenu = (x, y, e) => {
    this.setState({
      showContextMenu: true,
      contextTarget: e && e.dataset["filepath"] || "/"
    });
    this.contextMenu.current.style.left = x + "px";
    this.contextMenu.current.style.top = y + "px";
  }
  closeContextMenu = () => {
    this.setState({showContextMenu: false});
  }
  onContextMenu = e => {
    e.preventDefault();
    const item = e.target.closest("[data-filepath]");
    this.openContextMenu(e.clientX, e.clientY, item);

    return false;
  }

  /* rename box */
  enableRenameBox = (path) => {
    const e = document.querySelector(`[data-filepath='${path}'] > div > a`);
    if (!e) return;
    const rect = e.getBoundingClientRect();
    
    this.renameBox.current.style.left = rect.x + "px";
    this.renameBox.current.style.top = rect.y + "px";
    this.renameBox.current.style.width = rect.width + "px";
    this.renameBox.current.style.height = rect.height + "px";
    this.renameBox.current.value = e.innerHTML;

    window.setTimeout(() => {
      this.renameBox.current.focus();
      this.renameBox.current.select();
    }, 0)

    this.setState({
      showRenameBox: true,
      renamingPath: path,
    });
  }
  disableRenameBox = () => {
    this.setState({showRenameBox: false});
  }
  onRenameKeyDown = e => {
    if(e.keyCode == 13) {
      this.rename(this.state.renamingPath, this.renameBox.current.value);
      this.disableRenameBox();
    }
  }


  setCopyFrom = path => {
    this.setState({copyFrom: path});
  }

  /* 操作 (外部) */
  createNew = (path, name, isFolder) => {
    if (isFolder) console.log("create folder:", path, name)
    else console.log("create file:", path, name)
    
    this.props.create(path, name, isFolder);
  }
  copy = (from, to) => {
    console.log("copy:", from, to)
    this.props.copy(from, to);
  }
  delete = (path) => {
    console.log("delete:", path)
    this.props.delete(path);
  }
  rename = (path, name) => {
    console.log("rename:", path, name)
    this.props.rename(path, name);
  }

  render() {
    return (
      <div className={styles["dir-main"]}>
          <input type="text"
            className={styles.rename}
            onKeyDown={this.onRenameKeyDown}
            onInput={this.onRenameInput}
            ref={this.renameBox}
            style={{display: this.state.showRenameBox ? "block" : "none"}}
          />

          <div className={styles["context-menu"]}
            style={{
              display: this.state.showContextMenu ? "block" : "none",
            }}
            ref={this.contextMenu}
          >
            {
              this.menu.map((v, i) => {
                return (
                <div key={i} className={styles["context-menu-item"]} onClick={v[1]}>
                  {v[0]}
                </div>
                )
              })
            }
          </div>
          <div
            className={styles["context-menu-item-dummy"]}
            style={{display: this.state.showContextMenu || this.state.showRenameBox ? "block" : "none"}}
            onClick={() => {
              this.closeContextMenu();
              this.disableRenameBox();
            }}
            onContextMenu={this.ContextMenu}
          >
          </div>

          <div className={styles["dir-drop-zone"]}
            style={{
              display: this.state.dragover ? "block" : "none",
              backgroundImage: "url(" + uploadIcon + ")",
            }}
          >
          </div>
          <div className={styles["dir-header"]}>
            <span>ディレクトリ</span>
            <div className={styles["dir-header-icon"]} style={{marginLeft: "auto"}} onClick={() => this.createNew("/", "新しいファイル")}>
              <AddIcon />
            </div>
            <div className={styles["dir-header-icon"]} style={{marginLeft: "0.5em"}} onClick={() => this.createNew("/", "新しいフォルダ", true)}>
              <CreateFolderIcon />
            </div>
          </div>
          <div
            className={styles["dir-window"]}
            style={ {
              width: "100%"
            } }
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            onContextMenu={this.onContextMenu}    
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

