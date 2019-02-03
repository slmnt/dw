import React, { Component } from 'react';   
import styles from './Forum.module.css';

import Footer from '../Footer';

import { ReactComponent as SearchIcon } from '../../img/search.svg';




class ForumPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <div className={styles["post-container"]}>
        <div className={styles["post-avatar-container"]}>
          <img className={styles["post-avatar"]} src=""></img>
        </div>
        <div className={styles["post-main"]}>
          <div className={styles["post-user"]}>
            <div className={styles["post-username"]}>
              {this.props.user}
            </div>
          </div>
          <div className={styles["post-text"]}>
            {this.props.text}
          </div>
          <div className={styles["post-date"]}>
            2019年 15月 58日
          </div>
        </div>
      </div>
    )
  }
}

class ForumThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "test thread",
      op: {
        user: "Kang the conquerer",
        text: "I came, I saw, I conquererd",
      },
      comments: [
        {
          user: "Kang the destroyer",
          text: "I praise the lord, then break the law",
        },
        {
          user: "Kang the savage",
          text: "I take what's mine, then take some more",
        }
      ]
    }
  }
  render(){
    return (
      <div>
        <div className={styles["thread-op"]}>
          <div className={styles["thread-title"]}>
            {this.state.title}
          </div>
          <ForumPost user={this.state.op.user} text={this.state.op.text}/>
        </div>
        <div className={styles["thread-comments-container"]}>
          <div className={styles["thread-comments-title"]}>
            {`${this.state.comments.length + 1} コメント`}
          </div>
          {
            this.state.comments.map((v, i) => {
              return ( 
                <div className={styles["thread-comment"]}>
                  <ForumPost key={i} user={v.user} text={v.text} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}


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
          <ForumThread />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Forum;