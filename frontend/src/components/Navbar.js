import React from 'react';
import { Link } from 'react-router-dom';


import styles from './Navbar.module.css';
import { ReactComponent as Ham } from '../img/hamburger.svg';
import { ReactComponent as Logo } from '../img/logo.svg';

import {MainContext} from '../contexts/main';
import Hamon from './helper/Hamon';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showUserPopup: false
    };
  }
  onClickMenu = e => {
    if (this.props.onClickMenu) {
      this.props.onClickMenu(e);
    }
  }
  componentDidUpdate(){
    // console.log(this.context)
  }
  render() {
    /* flexbox で全て解決 */
    return (
      <nav className={styles.main}>
        {
          this.state.showUserPopup &&
            <div className={styles["user-popup"]}>
              <div>マイページ</div>
              <div>コース管理</div>
              <div>設定</div>
              <div>ヘルプ</div>
              <div>ログアウト</div>
            </div>
        }
        <div>
          <div className={styles.mobileButton} onClick={this.onClickMenu}>
            <Ham className={styles.hamburger}/>
            <Hamon color="#1abc9c" />
          </div>
          
          <Link to="/" className={styles.logo}>
            <Logo className={styles["logo-img"]} style={{width: "1em", height: "1em"}}/>
            <span>MiniProg</span>
          </Link>
        </div>

        {this.props.children}

        <div className={styles.rightMenu}>
          <div className={styles.navmenu}>
            <div><Link to="/getting-started">はじめる</Link></div>
            <div><Link to="/">コースを見る</Link></div>
            <div><Link to="/">コースを作る</Link></div>
          </div>
          <div className={styles.navmenu}>
            {
              !this.context.isLoggedIn ?
                <React.Fragment>
                  <div><Link to="/login">ログイン</Link></div>
                  <div><Link to="/signup">会員登録</Link></div>
                </React.Fragment>
              :
                <React.Fragment>
                  <div className={styles.avatar} onClick={() => this.setState({showUserPopup: !this.state.showUserPopup})}>
                  </div>
                </React.Fragment>
            }
          </div>
        </div>
      </nav>
    );
  }
}
NavBar.contextType = MainContext;
export default NavBar;

