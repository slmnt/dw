import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const styles = theme => ({
  body: {
    padding:"10px",
    backgroundColor: "#ffffff",
    height:"100vh",
    width:"100vw"
  },
  header: {
    textAlign:"center",
  },
  title: {
    color: "#99ff33",
    fontSize: "100px",
    padding: "50px"
  },
  sub_title: {
    color: "#000000",
    fontSize: "50px"
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
  }


  render() {
    const { classes } = this.props;

    return (
      <body className = {classes.body}>
        <header className = {classes.header}>
          <h1 className = {classes.title}>
            Mini Prog
          </h1>
          <h2 className = {classes.sub_title}>
            For all people who study programming.
          </h2> 
        </header>
      </body>
      
      
      
    )
  }
}
Main = withCookies(Main)  
export default withStyles(styles, {withTheme: true})(Main)