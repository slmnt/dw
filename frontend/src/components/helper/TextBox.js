import React, { Component } from 'react';   
import styles from './TextBox.module.css';

class TextBox extends Component {
  render() {
    return (
      <div className={styles.main}>
        <input type="text" className={styles.textbox} />
      </div>
    )
  }
}

export default TextBox;