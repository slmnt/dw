import React from 'react';
import PropTypes from 'prop-types';


class Left extends React.Component {
  
  constructor(props){
    super(props)

  }

  dragStart(e) {
    // Update our state with the item that is being dragged
    e.dataTransfer.effectAllowed = 'move'
    console.log('start')
  }

  dragOver(e) {
    console.log('dragging')
    e.preventDefault()
  }

  dragEnd() {
    console.log('end')
  }
    
  render() {
    return (
      <ul onDragOver={this.dragOver}>
        <li draggable="true" onDragEnd={this.dragEnd} onDragStart={this.dragStart}>
          test1
        </li>

      </ul>
    );
  }
}

Left.propTypes = {};

export default Left;
