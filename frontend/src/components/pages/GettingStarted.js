import React, { Component } from 'react';   
import styles from './GettingStarted.module.css';

import Footer from '../Footer';


class GettingStarted extends Component {
  render() {
    return (
      <div className={styles.main}>
        
        
        <div className={styles["header"]}>
          <div>
            MiniProg で ~ を ~ !!!""
          </div>
        </div>


        <div className={styles["slide-block-container"]}>
        <div className={styles["slide-block-left"]}>
          <div className={styles["slide-block-bg"]}>
          </div>
          <div className={styles["slide-block-body"]}>
            <div className={styles["slide-block-title"]}>
              1. コースを作る
            </div>
            <div className={styles["slide-block-desc"]}>
              数多くの言語に対応しております。
            </div>
          </div>
        </div>
        <div className={styles["slide-block-left"]}>
          <div className={styles["slide-block-bg"]}>
          </div>
          <div className={styles["slide-block-body"]}>
            <div className={styles["slide-block-title"]}>
              2. 公開
            </div>
            <div className={styles["slide-block-desc"]}>
              数多くの言語に対応しております。
            </div>
          </div>
        </div>
        <div className={styles["slide-block-left"]}>
          <div className={styles["slide-block-bg"]}>
          </div>
          <div className={styles["slide-block-body"]}>
            <div className={styles["slide-block-title"]}>
              3. コースを受けてみる
            </div>
            <div className={styles["slide-block-desc"]}>
              数多くの言語に対応しております。
            </div>
          </div>
        </div>
        <div className={styles["slide-block-left"]}>
          <div className={styles["slide-block-bg"]}>
          </div>
          <div className={styles["slide-block-body"]}>
            <div className={styles["slide-block-title"]}>
              4. 共有
            </div>
            <div className={styles["slide-block-desc"]}>
              数多くの言語に対応しております。
            </div>
          </div>
        </div>

        </div>

        <div className={styles["footer"]}>
          <span>
            登録
          </span>
          <span>
            コースを見る
          </span>
        </div>


        <Footer />
      </div>
    )
  }
}

export default GettingStarted;