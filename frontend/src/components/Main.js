import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Scrollbars } from 'react-custom-scrollbars';

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
    color: "#10316b",
    backgroundColor:"#ffe867",
    textAlign:"center",
    padding:"50px",
  },
  header_title: {
    fontSize: "70px",
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
    backgroundColor:"#10316b",
    fontSize:"30px",
    padding:"100px",
    borderBottom: "solid 1px #eeeeee",
  },
  main_contents_title: {
    color:"#10316b",
    paddingTop:"20px"
  },
  main_contents:{
    flexDirection:"row",
  },
  main_contents_1: {
    color:"white",
    backgroundColor:"#F26964",
    padding:"50px",
    margin:"70px",
  },
  main_contents_2: {
    color:"white",
    backgroundColor:"#F26964",
    padding:"50px",
    margin:"70px",
  },
  main_contents_3: {
    color:"white",
    backgroundColor:"#F26964",
    padding:"50px",
    margin:"70px"
  },
  main_contents_4: {
    color:"white",
    backgroundColor:"#F26964",
    padding:"50px",
    margin:"70px"
  },

// footer
  footer: {
    backgroundColor:"#10316b",
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
    console.log(props)
  }


  render() {
    const { classes } = this.props;
    return (
      <Scrollbars style={{ width: window.innerWidth, height: window.innerHeight }}>
      <body className = {classes.body}>
        <header className = {classes.header}>
          <h1 className = {classes.header_title}>
            Mini Prog
          </h1>
          <p className = {classes.header_sub_title}>
            For all people who study programming.
          </p>
        </header>

        <div className = {classes.main}>
          <div className = {classes.main_title}>
            <p>幅広い年齢層を対象にプログラミング教育を行えるシステム。</p>
            <h2>『<span>Mini Prog</span>』</h2>
          </div>
          <h3 className = {classes.main_contents_title}>サービスの特徴</h3>
          <div className = {classes.main_contents}>
            <div className = {classes.main_contents_1}>
             <h4>幅広いご利用可能年齢層</h4>
              <p>興味があれば、誰でも簡単にプログラミングが学べるよう、わかりやすい解説、見易い、そして、学ぶ意欲を掻き立てるようなデザインを心がけて作成しております。</p>
            </div>
            <div className = {classes.main_contents_2}>
              <h4>コードの結果をすぐに確認できる</h4>
              <p>用意されている、又は自分で書いたソースコードをネットで実行し、その結果をすぐに確認することで、思い通りに動いているか、エラーがないかどうかをすぐに確認することが出来ます。</p>
            </div>
            <div className = {classes.main_contents_3}>
              <h4>多言語対応</h4>
              <p>主流な言語は勿論のこと、数多くの言語に対応しております。さらに、ニーズに応じて、サービスの拡張も行っております。</p>
            </div>
            <div className = {classes.main_contents_4}>
              <h4>ユーザ間コミュニティ</h4>
              <p>サービス利用者同士でのコミュニケーションが可能。エラーの改善案を共有したり、わからない箇所を質問したりと、他の人と情報を共有することにより、新たな知識が身に付きます。</p>
            </div>
          </div>
        </div>

        <footer className = {classes.footer}>
          <p>Comming soon</p>
        </footer>
      </body>
      </Scrollbars>            
    )
  }
}
Main = withCookies(Main)  
export default withStyles(styles, {withTheme: true})(Main)