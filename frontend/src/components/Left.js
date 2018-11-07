import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  test: {
    backgroundColor: 'red'
  }
});

class left extends React.Component {
  
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

left.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(left);
