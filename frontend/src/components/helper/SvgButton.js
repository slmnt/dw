import React, { Component } from 'react';   
import styles from './SvgButton.module.css';

class SvgButton extends Component {
  render() {
    return (
      <div className={styles["container"]} onClick={this.props.click}>
        {this.props.children}
      </div>
    )
  }
}

export default SvgButton;