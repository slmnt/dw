import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const styles = theme => ({
  body: {
    fontFamily:"sans-serif",
  },
// header
  header: {
    textAlign:"center",
    borderBottom: "solid 1px #eeeeee",
    padding:"50px"
  },
  header_title: {
    color: "#99ff33",
    fontSize: "70px",
    padding: "30px"
  },
  header_sub_title: {
    color: "#000000",
    fontSize: "30px",
    paddingBottom:"30px"
  },
// main
  main: {
    backgroundColor:"#f0fff8",
    padding:"10px",
    textAlign:"center"
  },

// footer
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
  }


  render() {
    const { classes } = this.props;

    return (
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
            <h2>幅広い年齢層を対象にプログラミング教育を行えるシステム。</h2>
            <h2>『<span>Mini Prog</span>』</h2>
          </div>
        </div>
      </body>
      
      
      
    )
  }
}
Main = withCookies(Main)  
export default withStyles(styles, {withTheme: true})(Main)