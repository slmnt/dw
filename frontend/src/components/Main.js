import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import bridge from './bridge.jpeg';

const styles = theme => ({
  body: {
    fontFamily:"sans-serif",
    color:"#191970",
    fontSize:"20px"
  },
// header
  header: {
    backgroundImage: `url(${bridge})`,
    backgroundSize:"cover",
    backgroundPosition:"0px -250px",
    textAlign:"center",
    borderBottom: "solid 1px #eeeeee",
    padding:"50px"
  },
  header_title: {
    color: "#99ff33",
    fontSize: "70px",
    padding: "30px",
  },
  header_sub_title: {
    fontSize: "30px",
    paddingBottom:"30px"
  },
// main
  main: {
    backgroundColor:"#f0fff8",
    padding:"30px",
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
            <p>幅広い年齢層を対象にプログラミング教育を行えるシステム。</p>
            <h2>『<span>Mini Prog</span>』</h2>
          </div>
        </div>
      </body>
      
      
      
    )
  }
}
Main = withCookies(Main)  
export default withStyles(styles, {withTheme: true})(Main)