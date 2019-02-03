import React, { Component } from 'react';

import styles from './FileEditor.module.css';

import TextEditor from './TextEditor';
import DirTree from './DirTree';

import api from '../modules/api'
import { MainContext } from "../contexts/main";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class FileEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: { // text or url
        //"/src/index.js": "const a = 0;",
        //"/app.js": "const あこどぉう = 'ういえおｋ';"
      },
      directory: { // directory structure
        name: "", // root (名前なし)
        children: [
          /*
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
          */
        ]
      },
    }
    this.window = React.createRef();
  }

  // file
  uploadFiles = async (base_url) => {
    for (let path in this.state.files) {
      //var set = RegExp(/\w*\.\w*/);
      //if(set.test(path)){
      //}
      console.log("uploading", path)
      const fixedPath = path.replace(/^\/*/, '');

      let formData = new FormData();
      formData.append('base_url', base_url)
      formData.append(fixedPath, this.state.files[path])
      await api.post('/api/courseupload/',{
        body: formData
      })
    }
  }
  getDirtree = (root, path, base_url) => {
    if (!root) root = this.state.directory;

    var set = RegExp(/\w*\.\w*/);
    if(set.test(path)){
      let text = this.getTabValue(path)
      if(text){
        let formData = new FormData();
        formData.append('base_url', base_url)
        formData.append(path, text)
        api.post('/api/courseupload/',{
          body: formData
        })
      }
    }

    if(root.children){
      for(let c of root.children){
          this.getDirtree(c,path + '/' + c.name,base_url)
      }
    }
  }
  importDir = (files) => {
    let dirList = [];
    // ソート
    for (let path in files) {
        const list = path.split('/');
        let obj = this.state.directory;
        for (const dir of list) {
            if (dir !== '') {
                let c = obj.children.find(v => v.name === dir);
                if (!c) {
                    let newFile = { name: dir, parent: obj };
                    if (dir !== list[list.length - 1]) {
                        newFile.children = [];
                    }
                    obj.children.push(newFile);
                    c = obj.children[obj.children.length - 1];

                    dirList.push(obj);
                }
                obj = c;
            }
        }
    }
    for (let d of dirList) {
      this.sortDir(d);
    }
    
    this.setState({directory: this.state.directory})
  }
  importFiles = (files) => {
    this.setState({files: files})
  }
  findFile = (path) => {
    //console.log("findfile", path)
    if (path == "/") { // root
      return this.state.directory;
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
    return file;
  }
  findPath = (data) => {
    //console.log("findpath", data)
    
    let file = data;
    let path = '';

    while (file) {
      if (file.parent) path = '/' + file.name + path;
      file = file.parent;
    }
    return path;
  }

  createNew = (path, isFolder) => {
    const file = this.findFile(path);
    if (!file) return;

    let baseName = "新しい" + (isFolder ? "フォルダ" : "ファイル");
    let name = baseName;
    for(let i = 0; i < 100; i++) {
      let flag = false;
      for (let c of file.children) {
        if (c.name == name) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        break;
      }
      name = baseName + ` (${i + 1})`;
    }
    this.createDir(path, name, isFolder);
  }
  createDir = (path, name, isFolder) => {
    const file = this.findFile(path);
    if (!file || !file.children) return; // folder のみ

    const dup = file.children.find((v) => v.name == name);
    if (dup) {
      console.log("同じ名前のファイルが存在します:", name);
      return;
    }

    const newFile = {
      name: name,
      children: isFolder && [],
      parent: file
    };
    file.children.push(newFile);
    this.sortDir(file);
    this.setState({directory: this.state.directory});

    if (!isFolder) this.saveDir(this.findPath(newFile), '');
  }
  renameDir = (path, name) => {
    const file = this.findFile(path);
    if (!file) return;

    name = this.sanitizeFileName(name);
    let dir = this.splitPath(path).dir;
    let newPath = this.joinPath(dir, name);

    this.saveDir(newPath, this.window.current.getTabValue(path)); // 自動保存
    delete this.state.files[path];
    
    file.name = name;
    this.setState({files: this.state.files, directory: this.state.directory}, () => {
      this.updateTabName(path, name); // TextEditor も更新
    });
  }
  moveDir = (from, to) => {
    const file = this.findFile(from);
    const path = this.getDirPath(to);
    const dest = this.findFile(path);
    console.log(from, to, path, dest)
    if (!file || !dest || path == this.getDirPath(from) || !dest.children) return;

    // remove
    file.parent.children.splice(file.parent.children.indexOf(file), 1);
    const value = this.state.files[from];
    delete this.state.files[from];

    // place
    dest.children.push(file);
    file.parent = dest;
    this.sortDir(dest);
    this.state.files[this.joinPath(path, file.name)] = value;

    //
    this.setState({directory: this.state.directory});
  }
  deleteDir = (path) => {
    const file = this.findFile(path);
    console.log("close", path, file)
    if (!file || !file.parent || !file.parent.children) return;
    
    file.parent.children.splice(file.parent.children.indexOf(file), 1);
    this.setState({directory: this.state.directory});

    // close tab
    this.window.current.closeTab(path);

  }
  copyDir = (from, to) => {
    const fromFile = this.findFile(from);
    const name = this.splitPath(from).name;
    const path = this.getDirPath(to);
    console.log("copyDir", to, path)
    this.createDir(path, name, fromFile.children && true);
    this.saveDir(this.joinPath(to, name), this.state.files[from]);
  }
  saveDir = (path, value) => {
    console.log("saving:", path, value)
    this.state.files[path] = value;
    this.setState({files: this.state.files});
  }
  splitPath = (path) => {
    let i = path.lastIndexOf('/');
    return {
      dir: path.substring(0, i) || '/',
      name: path.substring(i + 1),
    }
  }
  joinPath = (p1, p2) => {
    return p1.replace(/(\/*)$/, '') + '/' + p2.replace(/^(\/*)/, '');
  }
  getDirPath = (path) => {
    const data = this.getFileData(path).data;
    return data.children ? path : this.splitPath(path).dir;
  }
  getFileData = (v) => {
    if (typeof(v) == 'string') {
      return {
        data: this.findFile(v),
        path: v
      }
    }
    return {
      data: v,
      path: this.findPath(v)
    };
  }
  sanitizeFileName = name => {
    return name.replace(/\//g, '');
  }

  onUpload = (files, path) => {
    if (!path) return;

    console.log(this.props.courseId)

    const formData = new FormData();
    formData.append('path', `/Course/${this.props.courseId}/${path}/${files[0].name}`);
    //formData.append('path', `/Course/${this.state.id}/${path}`);
    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    console.log(files)

    api.post('/api/upload/', {
      body: formData,
    })
    .then(api.parseJson)
    .then(response => {
      for (var i = 0; i < files.length; i++) {
        this.createDir(path, files[i].name);

        // ブラウザで読み込み
        let fullPath = this.joinPath(path, files[i].name);
        var reader = new FileReader();
        reader.onload = () =>  {
            this.state.files[fullPath] = reader.result;
            this.setState({files: this.state.files});
        }
        reader.readAsText(files[i]);
        console.log(this.state.files)
      }
      console.log('Success:', JSON.stringify(response))
    })
    .catch(error => console.error('Error:', error));
  
  }


  sortDir = (file) => {
    // フォルダを上位に & ファイル名で降順
    file.children.sort((a, b) => {
      if (!a.children || !b.children) {
        return (!a.children ? 1 : 0)  - (!b.children ? 1 : 0);
      }
      return a.name.localeCompare(b.name);
    })
  }
  
  // tab
  renameTab = (path, name) => {
    this.window.current.renameTab(path, name);
  }
  getTabValue = (path) => {
    return this.window.current.getTabValue(path);
  }
  updateTabName = (path, name) => {
    this.renameTab(path, name);
  }
  getContent = (path) => {
    return this.state.files[path];
  }

  // terminal
    /*
    // local
    this.localExec(cmd);
    */

    /*
    // docker
    */
    //let cmds = cmd.split(' ')
    //let base_url = `Course/${this.props.courseId}`
    //this.remoteExec(cmds, base_url, callback);
  
  remoteExec = (cmd, base_url, callback) => {
    let cmds = cmd.split(' ')

    switch(cmds[0]){
      case "javac":
      case "gcc":
      case "ruby":
      case "python":
        //Upload Dir tree, Running this cmd
        this.uploadFiles(base_url)
        let formData = new FormData();
        formData.append('cmd',cmds[1])
        formData.append('url',base_url)
        api.post('/api/dockpy',{
          body: formData
        }).then(api.parseJson).then(response => {
          if (!response) return;

          this.outputToTerm(response);
          if (callback) callback(response)
        })
      default:
        break
    }
  }
  localExec = (cmd, callback) => {
    let parser = cmd.split(' ')
    // console.log(parser)
    
    let arg = "/" + parser[1];
    // console.log(this.state.files)
    // console.log(arg)
    // console.log(this.state.files[arg])
    let text = this.window.current.getTabValue(arg) || this.state.files[arg];
    if (!text) return;

    console.log(text)

    api.ex_post('/api/python/',{
        contents: text 
    }).then(api.parseJson).then(response => {
        if (!response) return;
        console.log(response)

        this.outputToTerm(response);
        if (callback) callback(response);
    });
  }
  outputToTerm = (text) => {
    this.window.current.outputToTerm(text);
  }

  

  render() {
    return (
      <React.Fragment>
        <div className={styles["dirtree-container"]}>
          {/*
          */}
          <DirTree dir={this.state.directory}
            onOpenFile={path => {this.window.current.openTab(path);}}
            save={this.saveDir}
            rename={this.renameDir}
            delete={this.deleteDir}
            copy={this.copyDir}
            move={this.moveDir}
            create={this.createDir}
            createNew={this.createNew}

            onUpload={this.onUpload}
          />

        </div>
        <div className={styles["textditor-container"]}>
          <TextEditor
            ref={this.window}
            run={this.remoteExec}
            getContent={this.getContent}
            save={this.saveDir}
          />
          {/*
          */}

        </div>
      </React.Fragment>
    )
  }
}
FileEditor.contextType = MainContext;
export default FileEditor;