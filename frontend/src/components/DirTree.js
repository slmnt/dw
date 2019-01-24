import React from 'react';   
import { Scrollbars } from 'react-custom-scrollbars';


import styles from './DirTree.module.css';

import logo from '../img/logo.svg';


class DirTree extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileData: {
      }
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
  render() {
    return (
      <div className={styles["dir-main"]}>
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

