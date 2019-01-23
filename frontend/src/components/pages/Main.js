import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import classNames from 'classnames';


import styles from './Main.module.css'
import bridge from '../../img/bridge.jpeg';

import Footer from '../Footer';

const styles2 = theme => ({
  main: {
    fontFamily: "arial black,Yu Gothic",
  }
});

class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    // must need write this line before use cookies
    // const { cookies } = props;
    // cookies.set('test',100)
    // console.log(cookies.get('test'))
    // navigator.geolocation.getCurrentPosition(this.showposition,this.rejctpermission)
    this.state = {value: '', color: 'green'};
    // console.log(props)
  }

  render() {
    return (
      <div className={classNames(styles.body, this.props.classes.main)}>
        <header className={styles.header}>
          <h1 className={styles.header_title}>
            <span className={styles.m}>M</span>in<span className = {styles.i}>i</span> <span className = {styles.p}>P</span>ro<span className = {styles.g}>g</span>
          </h1>
          <p className={styles.header_sub_title}>
            For all people who study programming.
          </p>
        </header>

        <div className={styles.main}>
          <div className={styles.main_title} style={{
            background: `linear-gradient(to top, rgba(100, 100, 100, 0.5) 0%, rgba(151, 217, 225, 0.5) 100%),url(${bridge})`,
          }}>
            <div className={styles.rapper}>
              <p>幅広い年齢層を対象にプログラミング学習を行えるシステム。</p>
              <h2>『Mini Prog』</h2>
            </div>
            <div className={styles.welcomeContainer}>
              <div className={styles.signinBtn}>
                <Link to="/signup">新規会員登録</Link>
              </div>
              <div className={styles.startBtn}>
                <Link to="/getting-started">はじめてみる</Link>
              </div>
            </div>
          </div>
          <h3 className={styles.main_contents_title}>サービスの特徴</h3>
          <div className={styles.main_contents} style={{padding: "0 25px"}}>
            <div className={styles["f-grid"]}>
              <div className={classNames(styles["f-grid-item"], styles["main-tile"], styles["main_contents_1"])}>
                <h4>幅広いご利用可能年齢層</h4>
                <p>興味があれば、誰でも簡単にプログラミングが学べるよう、わかりやすい解説、見易い、そして、学ぶ意欲を掻き立てるようなデザインを心がけて作成しております。</p>
              </div>
              <div className={classNames(styles["f-grid-item"], styles["main-tile"], styles["main_contents_2"])}>
                <h4>コードの結果をすぐに確認できる</h4>
                <p>用意されている、又は自分で書いたソースコードをネットで実行し、その結果をすぐに確認することで、思い通りに動いているか、エラーがないかどうかをすぐに確認することが出来ます。</p>
              </div>
            </div>
            <div className={styles["f-grid"]}>
              <div className={classNames(styles["f-grid-item"], styles["main-tile"], styles["main_contents_3"])}>
                <h4>多言語対応</h4>
                <p>主流な言語は勿論のこと、数多くの言語に対応しております。さらに、ニーズに応じて、サービスの拡張も行っております。</p>
              </div>
              <div className={classNames(styles["f-grid-item"], styles["main-tile"], styles["main_contents_4"])}>
                <h4>ユーザ間コミュニティ</h4>
                <p>サービス利用者同士でのコミュニケーションが可能。エラーの改善案を共有したり、わからない箇所を質問したりと、他の人と情報を共有することにより、新たな知識が身に付きます。</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
Main = withCookies(Main)  
export default withStyles(styles2)(Main);