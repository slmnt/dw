import React from 'react';

import './Hamon.css';



class Hamon extends React.Component {
  constructor(props){
    super(props)
    this.timer = null;
    //this.visible = false;
  }
  onClick = e => {
    let hamon = e.currentTarget;
    let rect = hamon.parentNode.parentNode.getBoundingClientRect();

    let size = Math.max(rect.width, rect.height) + "px";
    hamon.style.width = size;
    hamon.style.height = size;

    hamon.style.transition = "transform 0s, background-color 0s";
    hamon.style.transform = "scale(0.5)";
    hamon.style.backgroundColor = "rgba(0, 0, 0, 0.5)"

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(()=> {
      hamon.style.transition = "transform 1s, background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0ms";
      hamon.style.transform = "scale(2)";
      hamon.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }, 0)
  }
  render() {
    return (
      <div className="hamonContainer">
        <div className="hamon" onClick={this.onClick}>
        </div>
      </div>
    );
  }
}

export default Hamon;

