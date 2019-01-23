import React from 'react';
import { Link } from 'react-router-dom';


import styles from './Navbar.module.css';
import { ReactComponent as Ham } from '../img/hamburger.svg';

import MainContext from '../contexts/main';
import Hamon from './helper/Hamon';

class NavBar extends React.Component {
  constructor(props){
    super(props)
  }
  onClickMenu = e => {
    if (this.props.onClickMenu) {
      this.props.onClickMenu(e);
    }
  }
  render() {
    /* flexbox で全て解決 */
    return (
      <nav className={styles.main}>
        <div>
          <div className={styles.mobileButton} onClick={this.onClickMenu}>
            <Ham className={styles.hamburger}/>
            <Hamon />
          </div>
          
          <div className={styles.logo}>
            <Link to="/">MiniProg</Link>
          </div>
        </div>

        {this.props.children}

        <div>{this.context.username}</div>
        <div className={styles.rightMenu}>
          <div><Link to="/login">Log in</Link></div>
          <div><Link to="/signup">Sign up</Link></div>
        </div>
      </nav>
    );
  }
}
NavBar.contextType = MainContext;
export default NavBar;

