import React, { Component } from 'react';   
import styles from './GettingStarted.module.css';

class GettingStarted extends Component {
  render() {
    return (
      <div className={styles.main}>
        get started
        <div className={styles["huge-panel"]}>
          1. 会員登録
        </div>
        <div className={styles["huge-panel"]}>
          2. コースを開始
        </div>
        <div className={styles["huge-panel"]}>
          3. ???
        </div>
        <div className={styles["huge-panel"]}>
          4. profit
        </div>
      </div>
    )
  }
}

export default GettingStarted;