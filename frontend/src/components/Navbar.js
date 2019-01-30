import React from 'react';
import { Link } from 'react-router-dom';


import styles from './Navbar.module.css';
import { ReactComponent as Ham } from '../img/hamburger.svg';
import { ReactComponent as Logo } from '../img/logo.svg';
import { ReactComponent as Arrow } from '../img/arrow-drop-down.svg';

import {MainContext} from '../contexts/main';
import Hamon from './helper/Hamon';
import RedirectLink from './RedirectLink';

import api from '../modules/api'
import history from '../modules/history';

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

  showPopup = () => {
    this.setState({showUserPopup: true});
  }
  hidePopup = () => {
    this.setState({showUserPopup: false});
  }
  onClickPopup = e => {
    if (e.target !== e.currentTarget) this.hidePopup();
  }

  createCourse = () => {
    let formData = new FormData();
    formData.append('title','testtitle')
    formData.append('desc','desc')

    api.post('/api/createcourse/',{
      body: formData
    }).then(api.parseJson)
    .then(response => {
      history.push(`/course/${this.context.uid}/${response.id}/edit`);
      //name: response.title,
      //id: response.id
    })
  }

  render() {
    /* flexbox で全て解決 */
    // console.log(this.context)

    return (
      <nav className={styles.main}>
        {
          this.state.showUserPopup &&
            <React.Fragment>
              <div className={styles["user-popup-bg"]} onClick={this.hidePopup}></div>
              <div className={styles["user-popup"]} onClick={this.onClickPopup}>
                <div><Link to="/mypage">マイページ</Link></div>
                <div><Link to="/mypage/courses">コース管理</Link></div>
                <div><Link to="/mypage/settings">設定</Link></div>
                <div><Link to="/help">ヘルプ</Link></div>
                <div><Link to="/" onClick={() => this.context.logout()} >ログアウト</Link></div>
              </div>
            </React.Fragment>
        }
        <div>
          <div className={styles.mobileButton} onClick={this.onClickMenu}>
            <Ham className={styles.hamburger}/>
            <Hamon color="var(--main-color)" />
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
            <div><Link to="/search/course">コースを見る</Link></div>
            <div><span onClick={this.createCourse}>コースを作る</span></div>
          </div>
          <div className={styles.navmenu}>
            {
              !this.context.isLoggedIn ?
                <React.Fragment>
                  <div><RedirectLink to="/login">ログイン</RedirectLink></div>
                  <div><RedirectLink to="/signup">会員登録</RedirectLink></div>
                </React.Fragment>
              :
                <React.Fragment>
                  <div>
                    {this.context.uid}
                  </div>
                  <div className={styles.avatar} onClick={this.showPopup}>
                  </div>
                  <Arrow onClick={this.showPopup} />
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

