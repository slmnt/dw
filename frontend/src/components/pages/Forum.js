import React, { Component } from 'react';   
import styles from './Forum.module.css';

import Footer from '../Footer';

import { ReactComponent as SearchIcon } from '../../img/search.svg';

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          title: "hi",
          text: "what"
        },
        {
          title: "hi",
          text: "what"
        },
        {
          title: "hi",
          text: "what"
        },
        {
          title: "hi",
          text: "what"
        },
        {
          title: "hi",
          text: "what"
        },
      ]
    }
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles["toolbar-right"]}>
            <div>おい</div>
            <div>やるぞ</div>
          </div>
          <span className={styles["title"]}>～を検索試用</span>
          <span className={styles["search-box-container"]}>
            <input type="text" className={styles["search-box"]} />
            <SearchIcon />
          </span>
        </div>
        <div className={styles["toolbar-left"]}>
          <div>質問</div>
          <div>提案</div>
          <div>ヘルプ</div>
          <div>会議</div>
          <div>がんくん</div>
          <div>話題</div>
        </div>
        <div className={styles.content}>
          {
            this.state.posts.map((v, i) => {
              return (
                <div key={i} className={styles["post"]}>
                  <div>{v.title}</div>
                  <div>{v.text}</div>
                </div>
              )
            })
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default Forum;