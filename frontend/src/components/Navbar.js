import React from 'react';

import styles from './Navbar.module.css';
import { ReactComponent as Ham } from '../img/hamburger.svg';

import Hamon from './helper/Hamon';

class NavBar extends React.Component {
  constructor(props){
    super(props)
  }
  onClickMenu = e => {

  }
  render() {
    /* flexbox で全て解決 */
    return (
      <nav className={styles.main}>
        <div className={styles.mobileButton}>
          <Ham className={styles.hamburger}/>
          <Hamon />
        </div>
      </nav>
    );
  }
}

export default NavBar;

