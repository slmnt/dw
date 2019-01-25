import React, { Component } from 'react';   
import styles from './NotFound.module.css';

class NotFound extends Component {

  componentDidMount(){
    var t =  document.getElementById("Not")
    t.focus()
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.back}>
          <div id="Not" className={styles["error-code"]}>
            NOT FOUND
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;