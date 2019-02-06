import React, { Component } from 'react';   
import { Link } from 'react-router-dom';

import styles from './ForumThread.module.css';
import api from '../../modules/api'

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.textInput = React.createRef();
  }
  onPost = e => {
    const text = this.textInput.current.value;
  }
  onCancel = e => {

  }
  render(){
    return (
      <div className={styles["newcomment-container"]}>
        <div className={styles["newcomment-header"]}>コメントの投稿</div>
        <textarea placeholder="投稿内容を書いてください" className={styles["newcomment-text-box"]} ref={this.textInput}></textarea>
        <div className={styles["newcomment-controls"]}>
          <button className={styles["newcomment-cancel-btn"]} onClick={this.onCancel}>キャンセル</button>
          <button className={styles["newcomment-post-btn"]} onClick={this.onPost}>投稿</button>
        </div>
      </div>
    )
  }
}


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
              <Link to={`/user/${this.props.user}`}>{this.props.user}</Link>
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
      id: this.props.match.params.id,
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
  componentDidMount() {
    api.get(`/api/thread/?id=${this.props.match.params.id}`).then(api.parseJson)
    .then(response => {
      console.log(response)
    }).catch(e => {
      console.log(e)
    }) 

  }
  render(){
    return (
      <div className={styles.main}>
        <div className={styles["thread-container"]}>
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
            <div className={styles["thread-post-comment-container"]}>
              <CreatePost />
            </div>
            {
              this.state.comments.map((v, i) => {
                return ( 
                  <div key={i} className={styles["thread-comment"]}>
                    <ForumPost key={i} user={v.user} text={v.text} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ForumThread;