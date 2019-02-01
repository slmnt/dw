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
  getDirtree = (root, path, base_url) => {
    if (!root) root = this.state.directory;

    var set = RegExp(/\w*\.\w*/);
    if(set.test(path)){
      let text = this.getTabValue(path)
      if(text){
        let formData = new FormData();
        formData.append('base_url',base_url)
        formData.append(path,text)
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
    for (let path in files) {
        const list = path.split('/');
        let obj = this.state.directory;
        for (const dir of list) {
            if (dir !== '') {
                let c = obj.children.find(v => v.name === dir);
                if (!c) {
                    let newFile = { name: dir };
                    if (dir !== list[list.length - 1]) {
                        newFile.children = [];
                    }
                    
                    obj.children.push(newFile);
                    c = obj.children[obj.children.length - 1];
                }
                obj = c;
            }
        }
    }
      //console.log(this.state.directory)
  }
  importFiles = (files) => {
    this.setState({files: files})
  }
  findFile = (path) => {
    console.log("findfile", path)
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


  createNew = (path, isFolder) => {
    const data = this.findFile(path);
    if (!data.file) return;

    let baseName = "新しい" + (isFolder ? "フォルダ" : "ファイル");
    let name
    for(let i = 0; i < 100; i++) {
      name = baseName + ` (${i + 1})`;
      let flag = false;
      for (let c of data.file.children) {
        if (c.name == name) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        break;
      }
    }
    this.createDir(path, name, isFolder);
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
    this.saveDir(this.splitPath(path).path + "/" + name, this.state.files[path]); // 自動保存
    
    data.file.name = name;
    this.setState({directory: this.state.directory});


  }
  deleteDir = (path) => {
    const data = this.findFile(path);
    console.log("close", path, data)
    if (!data || !data.parent) return;
    
    data.parent.children.splice(data.index, 1);
    this.setState({directory: this.state.directory});

    // close tab
    this.window.current.closeTab(path);

  }
  copyDir = (from, to) => {
    console.log("copyDir", from, to)
    const data = this.findFile(from);
    const name = this.splitPath(from).name;
    const path = this.splitPath(to).path;
    this.createDir(path, name, !data.children);
    this.saveDir(to, this.state.files[from]);
  }
  saveDir = (path, value) => {
    if (!this.state.files[path]) return;
    this.state.files[path] = value;
    this.setState({files: this.state.files});
  }
  splitPath = (path) => {
    let i = path.lastIndexOf('/');
    return {
      name: path.substring(0, i),
      dir: path.substring(i + 1),
    }
  }

  onUpload = (files, path) => {
    if (!path) return;

    const formData = new FormData();
    formData.append('path', `/Course/${this.state.id}/${path}/${files[0].name}`);
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

        let fullPath = `${path}${files[i].name}`;
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
  runTerminal = (cmd) => {
    this.cmdExcute(cmd);
    /*
    // docker
    let cmds = cmd.split(' ')
    let base_url = "Course/" + this.state.id
    
    this.executeCode(cmds, base_url);
    */
  }
  executeCode = (cmds, base_url) => {
    switch(cmds[0]){
      case "javac":
      case "gcc":
      case "ruby":
      case "python":
        //Upload Dir tree, Running this cmd
        this.getDirtree(this.state.directory, '', base_url)
        let formData = new FormData();
        formData.append('cmd',cmds[1])
        formData.append('url',base_url)
        api.post('/api/dockpy',{
          body: formData
        })  
        break
      default:
        break
    }
  }
  cmdExcute = (cmd) => {
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
        // Print Result
        console.log(response)
        this.outputToTerm(response);
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
            create={this.createDir}
            createNew={this.createNew}

            onUpload={this.onUpload}
          />

        </div>
        <div className={styles["textditor-container"]}>
          <TextEditor ref={this.window} run={this.runTerminal} getContent={this.getContent}/>
          {/*
          */}

        </div>
      </React.Fragment>
    )
  }
}
FileEditor.contextType = MainContext;
export default FileEditor;