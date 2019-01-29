import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import styles from './Footer.module.css';

import { ReactComponent as Logo } from '../img/logo.svg';


class Footer extends Component {
  render() {
    return (
      <footer className={styles.main}>
        <div className={styles["main-footer"]}>
          <div className={styles["nav-container"]}>
            <div className={styles["nav-block"]}>
              <span><Link to="/">トップページ</Link></span>
              <span><Link to="/getting-started">はじめる</Link></span>
              <span>会員登録</span>
              <span>マイページ</span>
            </div>
            <div className={styles["nav-block"]}>
              <span><Link to="/search/course">コース検索</Link></span>
              <span><Link to="/search/user">ユーザ検索</Link></span>
              <span><Link to="/">コースを作る</Link></span>
            </div>
            <div className={styles["nav-block"]}>
              <span><Link to="/about">about</Link></span>
              <span>Policy</span>
              <span>Help</span>
            </div>
          </div>
          <div className={styles["logo-block"]}>
            <span>
              <Logo style={{width: "3em", height: "3em"}}/>
            </span>
            <span style={{color: "var(--main-color)"}}>MiniProg</span>
          </div>
        </div>
        <div className={styles.bottom}> 
          <div>
            <span>
              Made with ☆ by Kang Academy
            </span>
            <span>
              © 2019 Stair Studio
            </span>
          </div>
          <div>
            <span>
              <Link to="/terms">
                利用規約
              </Link>
            </span>
            <span>
              <Link to="/privacy">
                プライバシー
              </Link>
            </span>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;