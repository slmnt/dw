import React from 'react';

import './Hamon.css';



class Hamon extends React.Component {
  constructor(props){
    super(props)
    this.timer = null;
    //this.visible = false;
  }
  onClick = e => {
    //console.log("hamn")
    let hamon = e.currentTarget;
    let rect = hamon.parentNode.parentNode.getBoundingClientRect();

    //console.log(rect.width, rect.height)
    let size = Math.max(rect.width, rect.height);
    //console.log(size)
    hamon.style.width = size + "px";
    hamon.style.height = size + "px";

    hamon.style.top = (rect.height / 2 - size / 2) + "px";
    hamon.style.left = (rect.width / 2 - size / 2) + "px";

    hamon.style.transition = "transform 0s, opacity 0s";
    hamon.style.transform = "scale(0.5)";
    hamon.style.opacity = "0.5"

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(()=> {
      hamon.style.transition = "transform 1s, opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0ms";
      hamon.style.transform = "scale(2)";
      hamon.style.opacity = "0";
    }, 0)
  }
  render() {
    return (
      <div className="hamonContainer">
        <div className="hamon" onClick={this.onClick}
          style={{
            backgroundColor: this.props.color || "#1865f2"
          }}
        >
        </div>
      </div>
    );
  }
}

export default Hamon;

