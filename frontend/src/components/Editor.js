import React, { Component } from 'react';
import './Editor.css';

class Editor extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            HEADER
          </div>
          <div className="main-container">
            <div className="side" onClick={() => {}}>
              SIDE
            </div>
            <div className="main-container-2">
              <div className="main" >
                MAIN
              </div>
              <div className="footer">
                FOOTEER
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
