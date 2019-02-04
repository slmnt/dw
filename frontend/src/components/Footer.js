import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import styles from './Footer.module.css';
import {MainContext} from '../contexts/main';

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
            </div>
            <div className={styles["nav-block"]}>
              {
                this.context.isLoggedIn ?
                  <React.Fragment>
                    <span><Link to="/mypage">マイページ</Link></span>
                    <span><Link to="/mypage/settings">設定</Link></span>
                  </React.Fragment>
                :
                  <React.Fragment>
                    <span><Link to="/login">ログイン</Link></span>
                    <span><Link to="/signin">会員登録</Link></span>
                  </React.Fragment>
              }
            </div>
            <div className={styles["nav-block"]}>
              <span><Link to="/forum">フォーラム</Link></span>
              <span><Link to="/search/course">コース検索</Link></span>
              <span><Link to="/search/user">ユーザ検索</Link></span>
            </div>
            <div className={styles["nav-block"]}>
              <span><Link to="/about">このサイトについて</Link></span>
              <span><Link to="/term">プライバシーポリシー</Link></span>
              <span><Link to="/help">ヘルプ</Link></span>
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
Footer.contextType = MainContext;

export default Footer;