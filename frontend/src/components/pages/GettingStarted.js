import React, { Component } from 'react';   
import styles from './GettingStarted.module.css';

class GettingStarted extends Component {
  render() {
    return (
      <div className={styles.main}>
        
        
        <div className={styles["header"]}>
          <div>
            MiniProg で ~ を ~ !!!
          </div>
        </div>


        <div className={styles["huge-panel"]}>
          1. コースを作る
        </div>
        <div className={styles["huge-panel"]}>
          2. 公開
        </div>
        <div className={styles["huge-panel"]}>
          3. コースを受けてみる
        </div>
        <div className={styles["huge-panel"]}>
          4. 共有
        </div>


        <div className={styles["footer"]}>
          <div>
            登録
          </div>
          <div>
            コースを見る
          </div>
        </div>


      </div>
    )
  }
}

export default GettingStarted;