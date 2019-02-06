import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Forum.module.css';

import api from '../../modules/api'
import { ReactComponent as SearchIcon } from '../../img/search.svg';

import Footer from '../Footer';
import Pagination from '../Pagination';

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
//////////////////////////////////////////////////////////////

class CreateThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.titleInput = React.createRef();
    this.descInput = React.createRef();
  }

  onPost = e => {    
    //run
    const cat = this.props.category;
    const title = this.titleInput.current.value;
    const desc = this.descInput.current.value;
    api.ex_post('/api/thread/',{
      title: title,
      text: desc,
      category: cat
    })
    if (this.props.onCancel) this.props.onCancel();
  }
  onCancel = e => {
    if (this.props.onCancel) this.props.onCancel();
  }
  render(){
    return (
      <div className={styles["newthread-container"]}>
        <div className={styles["newthread-controls"]}>
          <span className={styles["newthread-header"]}>スレッドの投稿</span>
          <span style={{marginLeft: "auto"}}>
            <button className={styles["newthread-cancel-btn"]} onClick={this.onCancel}>キャンセル</button>
            <button className={styles["newthread-post-btn"]} onClick={this.onPost}>投稿</button>
          </span>
        </div>
        <input type="text" placeholder="タイトルを書いてください" maxLength={30} className={styles["newthread-title-box"]} ref={this.titleInput}></input>
        <textarea placeholder="投稿内容を書いてください" maxLength={1000} className={styles["newthread-text-box"]} ref={this.descInput}></textarea>
      </div>
    )
  }
}

/////////////////////////////////////////////////////////////////////////////////
/* Category List
  all
  Question
  Proposal
  QNA
  Challenge
*/
class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      selectedCat: false,
      isCreating: false,

      page: 1,
      totalPages: 1,
      pageSize: 10,

      categories: [
        {name: "すべて", id: "all"},
        {name: "質問", id: "Question"},
        {name: "がんくんへの質問", id: "gqa"},
        {name: "提案", id: "Proposal"},
        {name: "コース作成について", id: "QNA"},
        {name: "問題", id: "Challenge"},
        {name: "質問", id: "q"},
      ],
      posts: [
        {
          title: "コースの作成について",
          text: "テスト",
          avatar: "a",
          user: "Kang, an intellectual",
          cat: "test",
          date: "2119/98/92",
        },
        {
          title: "編集方法",
          text: "テスト",
          avatar: "a",
          user: "Kang, an intellectual",
          cat: "test",
          date: "2119/98/92",
        },
        {
          title: "hi",
          text: "what",
          avatar: "a",
          user: "Kang, an intellectual",
          cat: "test",
          date: "2119/98/92",
        },
        {
          title: "hi",
          text: "what",
          avatar: "a",
          user: "Kang, an intellectual",
          cat: "test",
          date: "2119/98/92",
        },
        {
          title: "hi",
          text: "what",
          avatar: "a",
          user: "Kang, an intellectual",
          cat: "test",
          date: "2119/98/92",
        },
      ]
    };

    this.searchBox = React.createRef();
  }
  componentDidMount() {
    this.selectCat('all');
    this.setState({isSearching: false});
  }
  
  load = () => {
    // console.log("search: ")
    api.get(`/api/thread/?page=${1}&s=${20}&cat=${this.state.selectedCat}`).then(api.parseJson)
    .then(response => {
      this.setState({
        posts: response.threads
      })
    }).catch(e => {
      console.log(e)
    }) 
  }
  search = (e) => {
    this.load();
    this.setState({isSearching: true});
    this.searchBox.current.blur();
  }
  selectCat = (catId) => {
    this.setState({selectedCat: catId}, () => {
      this.load();
    });
  }

  showCreatingForm = () => {
    this.setState({isCreating: true});
  }
  hideCreatingForm = () => {
    this.setState({isCreating: false});
    this.load();
  }
  convertdata(date){
    var time = new Date(date)
    return time.toLocaleString()
  }

  clampPage = (v) => {
    return Math.max(1, v);
  }
  goToPage = (v) => {
    const page = this.clampPage(v);
    this.state.setState({page: page}, () => {
      this.search();
    });
  }
  addToPage = (v) => {
    this.goToPage(this.state.page + v)
  }


  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}
          style={{
            position: this.state.isSearching ? "sticky" : "",
          }}
        >

          <div className={styles["search-header"]}
            style={{
              height: this.state.isSearching ? "5em" : ""
            }}
            >
            <div className={styles["toolbar-right"]}
              style={{
                display: this.state.isSearching ? "none" : ""
              }}
              >
            {/*
              <div>おい</div>
              <div>やるぞ</div>
            */}
            </div>
            <span className={styles["title"]}
              style={{
                display: this.state.isSearching ? "none" : ""
              }}
            >気になることを探してみよう</span>
            <span className={styles["search-box-container"]}>
              <input type="text" className={styles["search-box"]} maxLength={30} ref={this.searchBox} onKeyPress={(e) => e.nativeEvent.key === "Enter" && this.search(e)}  />
              <SearchIcon />
            </span>
          </div>
          <div className={styles["toolbar"]}>
            <div className={styles["toolbar-left"]}>
              {
                this.state.categories.map((v, i) => {
                  return <div key={i} className={this.state.selectedCat === v.id ? styles["toolbar-item-selected"] : ""} onClick={() => {this.selectCat(v.id); this.setState({isSearching: true}); } }>
                    {v.name}
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {
            this.state.selectedCat !== 'all' &&
            <div style={{width: "100%"}}>
              {
                this.state.isCreating ?
                  <CreateThread category={this.state.selectedCat} oanPost={this.hideCreatingForm} onCancel={this.hideCreatingForm} />
                :
                  <button className={styles["create-btn"]} onClick={this.showCreatingForm}>スレッドを新規作成</button>
              }
            </div>
          }
          {
            this.state.posts.map((v, i) => {
              return (
                <div key={i} className={styles["post"]}>
                  <div className={styles["post-header"]}>
                    <span className={styles["post-title"]}>{v.title}</span>
                    <span>
                      <span className={styles["post-avatar"]}>{v.avatar}</span>
                      <span className={styles["post-user"]}>{v.auth}</span>
                    </span>
                  </div>
                  <div>{v.text}</div>
                  <div className={styles["post-date"]}>
                    <span>
                      {v.category}
                    </span>
                    <span>
                      {this.convertdata(v.updateat)}
                    </span>
                  </div>
                </div>
              )
            })
          }
          <div style={{height: "15em"}}></div>
          <div className={styles["pagination-container"]}>
            <Pagination first={1} last={this.state.totalPages} maxButtons={5} currentPage={this.state.page}
              onClickPrev={() => this.addToPage(-1)}
              onClickNext={() => this.addToPage(1)}
              onClickFirst={() => this.goToPage(1)}
              onClickLast={() => this.goToPage(this.state.totalPages)}
              onClickPage={(i) => this.goToPage(i)}
            />
          </div>
          <TopicList />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Forum;