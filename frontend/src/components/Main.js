import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Scrollbars } from 'react-custom-scrollbars';
import { Grid } from '@material-ui/core';
import bridge from './bridge.jpeg';
import './Main.css'

const styles = theme => ({
  body: {
    backgroundColor:"#f2f7ff",
    fontFamily:"arial black,Yu Gothic",
    color:"#ffe867",
    fontSize:"20px",
    width:"100%",
  },
  // header
  header: {
    color:"#f2f7ff",
    backgroundColor:"#1abc9c",
    textAlign:"center",
    padding:"50px",
  },
  header_title: {
    fontSize: "70px",
  },
  m:{
    fontSize:"100px",
  },
  p:{
    fontSize:"100px",
  },
  header_sub_title: {
    fontSize: "30px",
    paddingBottom:"30px"
  },

// main
  main: {
    textAlign:"center",
  },
  main_title: {
    color:"#f2f7ff",
    background: `linear-gradient(to top, rgba(150, 100, 150, 0.5) 0%, rgba(151, 217, 225, 0.5) 100%),url(${bridge})`,
    backgroundRepeat:"no-repeat", 
    backgroundSize:"cover",
    fontSize:"30px",
    padding:"100px",
    borderBottom: "solid 1px #eeeeee",
  },
  main_contents_title: {
    color:"#f2f7ff",
    backgroundColor:"#1abc9c",
    padding:"50px",
    //margin:"50px 100px 0px 100px",
  },
  main_contents: {
    color:"#f2f7ff",
  },
  main_contents_1: {
    backgroundColor:"#e74c3c",
    padding:"50px",
    margin:"50px 25px 25px 50px",
  },
  main_contents_2: {
    backgroundColor:"#3498db",
    padding:"50px",
    margin:"50px 50px 25px 25px",
  },
  main_contents_3: {
    backgroundColor:"#f1c40f",
    padding:"50px",
    margin:"25px 25px 100px 50px"
  },
  main_contents_4: {
    backgroundColor:"#2ecc71",
    padding:"50px",
    margin:"25px 50px 100px 25px "
  },

// footer
  footer: {
    color:"#f2f7ff",
    backgroundColor:"#1abc9c",
    borderTop: "solid 1px #eeeeee",
    height:"100px",
    padding:"50px",
    textAlign:"right",
    clear:"left",

  }
})

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
    const { classes } = this.props;
    return (
        <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "95vh" }}>
      <div className = {classes.body}>
        <header className = {classes.header}>
          <h1 className = {classes.header_title}>
            <span className = {classes.m}>M</span>in<span className = {classes.i}>i</span> <span className = {classes.p}>P</span>ro<span className = {classes.g}>g</span>
          </h1>
          <p className = {classes.header_sub_title}>
            For all people who study programming.
          </p>
        </header>

        <div className = {classes.main}>
          <div className = {classes.main_title}>
            <div className="rapper">
              <p>幅広い年齢層を対象にプログラミング学習を行えるシステム。</p>
              <h2>『Mini Prog』</h2>
            </div>
          </div>
          <h3 className = {classes.main_contents_title}>サービスの特徴</h3>
          <Grid container direction="row" justify="center" text-align="center" className = {classes.main_contents}>
            <Grid item xs = {5} className = {classes.main_contents_1}>
             <h4>幅広いご利用可能年齢層</h4>
              <p>興味があれば、誰でも簡単にプログラミングが学べるよう、わかりやすい解説、見易い、そして、学ぶ意欲を掻き立てるようなデザインを心がけて作成しております。</p>
            </Grid>
            <Grid item xs = {5} className = {classes.main_contents_2}>
              <h4>コードの結果をすぐに確認できる</h4>
              <p>用意されている、又は自分で書いたソースコードをネットで実行し、その結果をすぐに確認することで、思い通りに動いているか、エラーがないかどうかをすぐに確認することが出来ます。</p>
            </Grid>
            <Grid item xs = {5} className = {classes.main_contents_3}>
              <h4>多言語対応</h4>
              <p>主流な言語は勿論のこと、数多くの言語に対応しております。さらに、ニーズに応じて、サービスの拡張も行っております。</p>
            </Grid>
            <Grid item xs = {5} className = {classes.main_contents_4}>
              <h4>ユーザ間コミュニティ</h4>
              <p>サービス利用者同士でのコミュニケーションが可能。エラーの改善案を共有したり、わからない箇所を質問したりと、他の人と情報を共有することにより、新たな知識が身に付きます。</p>
            </Grid>
          </Grid>
        </div>

        <footer className = {classes.footer}>
          <p>Comming soon</p>
        </footer>
      </div>
      </Scrollbars>            
    )
  }
}
Main = withCookies(Main)  
export default withStyles(styles, {withTheme: true})(Main)