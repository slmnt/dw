import React, { Component } from 'react';   
import styles from './UserPanel.module.css';

class UserPanel extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.avatar}>
          <a><img src={this.props.avatar}></img></a>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            <a>{this.props.username}</a>
          </div>
          <div className={styles.description}>
            {this.props.desc}
          </div>
        </div>
      </div>
    )
  }
}

export default UserPanel;