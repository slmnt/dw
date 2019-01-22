import React, { Component } from 'react';   
import styles from './NotFound.module.css';

class NotFound extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.back}>
          <div className={styles["error-code"]}>
            NOT FOUND
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;