import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import styles from './Footer.module.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className={styles.footer}>
          <p>Coming soon</p>
        </div>
        <div className={styles.bottom}> 
          <div>
            <span>
              Made with ❤ by Monta Academy
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