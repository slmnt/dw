import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Forum.module.css';

import Footer from '../Footer';
import api from '../../modules/api'

import { ReactComponent as SearchIcon } from '../../img/search.svg';

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [
        {
          name: "質問",
          desc: "this is a test",
        },
        {
          name: "C 言語",
          desc: "this is a test",
        },
        {
          name: "Java",
          desc: "this is a test",
        },
        {
          name: "コース作成について",
          desc: "this is a test",
        },
        {
          name: "がんくんへの質問",
          desc: "this is a test",
        },
        {
          name: "雑談",
          desc: "this is a test",
        },


      ]
    }
  }
  render(){
    return (
      <div className={styles["topiclist-container"]}>
        {
          this.state.topics.map((v, i) => {
            return <div key={i} className={styles["topiclist-item"]}>
              <div className={styles["topiclist-name"]}>
                <a>
                  {v.name}
                </a>
              </div>
              <div className={styles["topiclist-desc"]}>
                {v.desc}
              </div>
            </div>
          })
        }
      </div>
    )
  }
}



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
      <div className={styles["newthread-container"]}>
        <div className={styles["newthread-header"]}>コメントの投稿</div>
        <textarea placeholder="投稿内容を書いてください" className={styles["newthread-text-box"]} ref={this.descInput}></textarea>
        <div className={styles["newthread-controls"]}>
          <button className={styles["newthread-cancel-btn"]} onClick={this.onCancel}>キャンセル</button>
          <button className={styles["newthread-post-btn"]} onClick={this.onPost}>投稿</button>
        </div>
      </div>
    )
  }
}


class CreateThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.titleInput = React.createRef();
    this.descInput = React.createRef();
  }
  onPost = e => {
    const title = this.titleInput.current.value;
    const desc = this.descInput.current.value;
    api.ex_post('/api/userboard/',{
      title: title,
      text: desc
    })

    // test get
    api.get(`/api/userboard/?page=${1}&s=${20}`).then(api.parseJson)
    .then(response => console.log(response)).catch()
  }
  onCancel = e => {

  }
  render(){
    return (
      <div className={styles["newthread-container"]}>
        <div className={styles["newthread-controls"]}>
          <span className={styles["newthread-header"]}>スレッドの投稿</span>
          <button className={styles["newthread-cancel-btn"]} onClick={this.onCancel}>キャンセル</button>
          <button className={styles["newthread-post-btn"]} onClick={this.onPost}>投稿</button>
        </div>
        <input type="text" placeholder="タイトルを書いてください" maxLength={30} className={styles["newthread-title-box"]} ref={this.titleInput}></input>
        <textarea placeholder="投稿内容を書いてください" maxLength={1000} className={styles["newthread-text-box"]} ref={this.descInput}></textarea>
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
                <div key={i} className={styles["thread-comment"]}>
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
          title: "コースの作成について",
          text: "テスト"
        },
        {
          title: "編集方法",
          text: "テスト"
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
  search = (e) => {

  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles["toolbar-right"]}>
          {/*
            <div>おい</div>
            <div>やるぞ</div>
          */}
          </div>
          <span className={styles["title"]}>気になることを探してみよう</span>
          <span className={styles["search-box-container"]}>
            <input type="text" className={styles["search-box"]} maxLength={30} onKeyPress={(e) => e.nativeEvent.key === "Enter" && this.search(e)}  />
            <SearchIcon />
          </span>
        </div>
        <div className={styles["toolbar"]}>
          <div className={styles["toolbar-left"]}>
            <div>質問</div>
            <div>提案</div>
            <div>ヘルプ</div>
            <div>会議</div>
            <div>がんくん</div>
            <div>話題</div>
          </div>
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
          <div style={{height: "5em"}}></div>
          <ForumThread />
          <div style={{height: "5em"}}></div>
          <CreateThread />
          <div style={{height: "5em"}}></div>
          <CreatePost />
          <div style={{height: "5em"}}></div>
          <TopicList />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Forum;