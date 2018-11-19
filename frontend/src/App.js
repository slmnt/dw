import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import axios from 'axios';
import { ListItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '@material-ui/core/Button';

import Main from './components/Main'; 
//import Right from './components/Inter';
//import Right from './components/CreateUser';
import Right from './components/MyProgram';
import Three from './components/three';
import Login from './components/Login';
import Mypage from './components/mypage';
import Codeman from './components/code/codeman';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    width: '100%',
    left: 0,
    top: 0,
  },
  appBar: {
    position: 'absolute',
    backgroundColor: '#0b409c',
    color: '#ffe867',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },  
  logoutButton: {
    position: 'absolute',
    left: '85%'    
  },
  test: {
    backgroundColor: 'red'
  }
});

class App extends React.Component {
  state = {
    open: false,
    anchor: 'left',
    login: false,
    uid: '',
    current: '',
    language: 'python'
  };

  constructor(props){
    super(props)
    
    this.clicked = this.clicked.bind(this);
    this.statecallback = this.statecallback.bind(this)
    this.drop = this.drop.bind(this)
    this.drawercloseer = this.drawercloseer.bind(this)
    this.testprops = this.testprops.bind(this)
    this.gomypage = this.gomypage.bind(this)
    this.setlen = this.setlan.bind(this)
    this.getlen = this.getlan.bind(this)
    // console.log(props.history.location.pathname)

    // window.addEventListener('beforeunload',e => this.closewindows(e))
  }

  closewindows(){
    axios.get('/api/cookieauth/').then((response) => {
    }).catch((e) => {
    })
    return 'test'
  }

  setlan(l){
    this.setState({ language: l})
  }

  getlan(){
    return this.state.language
  }

  drop(){
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    console.log(this.state.uid)

    axios.post('/api/dropliveuser/',{
      uid: this.state.uid,
      }).then(response => {
      console.log(response)
      this.setState({
        login: false
      })
      this.clicked('/') 
    }).catch(e => {
      // console.log(e)
    })              
  }
  
  componentWillMount(){
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    // user platform check
    // console.log(window.navigator.platform)
    if(this.props.history.location.pathname === '/'){
      axios.get('/api/cookieauth/').then((response) => {
        if (response.status === 200){
          this.setState({
            uid: response.data,
            login: true
          })
          this.clicked('mypage')
        } else {
          this.clicked('/') 
        }
      }).catch((e) => {
  
      })
    }
    else {
      axios.get('/api/cookieauth/').then((response) => {
        if (response.status === 200){
          this.setState({
            uid: response.data,
            login: true
          })
        }
      }).catch((e) => {
      })      
    }
  }

  statecallback = (datafromchild) => {
    this.setState({
      login: datafromchild.login,
      uid:  datafromchild.uid
    })
    if(datafromchild.login === true){
      this.clicked('mypage') 
    } 
    // console.log(datafromchild)
  }

  drawercloseer(){
    if(this.state.open){
      this.handleDrawerClose()
    }
  }

  handleDrawerOpen = () => {
    // console.log('open')
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    // console.log('close')
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };
  componentDidCatch(error, info){
    console.log('error')
  }
  clicked(e){
    this.setState({current: e})
    this.props.location.pathname = '/' + e
    this.props.history.push(e)
  }

  gomypage(e){

    if(this.state.login){
      e = 'mypage'      
    }
    else{
      e = 'login'
    }

    this.setState({current: e})
    this.props.location.pathname = '/' + e
    this.props.history.push(e)
  }


  testprops(){
    console.log(this.state.current)
  }


  render() {
    // update rendering
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const contents = (
      <div>
      {/*
      setting react router route
      <Route exact path="/"  render={() => <Login test={this.statecallback} />}/>
      */}
      <Route exact path="/"  render={() => <Main />}/>
      <Route path="/right" component={Right} />
      <Route path="/main" component={Main}/>
      <Route path="/mypage" render={(props) => <Mypage {...props} gogo={this.testprops} set={this.setlen}/>} />
      <Route path="/codemain" render={() => <Codeman testprops={this.testprops} get={this.getlen} set={this.setlen}/>}/>
      <Route path="/three" render={(props) => <Three {...props}/>} />
      <Route path="/login"  render={() => <Login test={this.statecallback} />}/>
      </div>
    );

    const planed = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      </Drawer>
    );

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Scrollbars>        
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('three')}><Typography>three</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('right')}><Typography>right</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('main')}><Typography>main</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.gomypage('mypage')}><Typography>mypage</Typography></ListItem></List>
        <Divider />
        <List><ListItem button><Typography>help</Typography></ListItem></List>
        </Scrollbars>
      </Drawer>
    );

    const logout = (
      <Button color="inherit" onClick={this.drop}>Logout</Button>
    );

    const login = (
      <Button color="inherit" onClick={e => this.clicked('login')}>Login</Button>
    );

    let before = null;
    let after = null;
    let log = null

    if(this.state.login){
      log = logout
    } else{
      log = login
    }
    if (anchor === 'left') {
        before = drawer;

    } else {
        after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            sition='sticky'
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {this.state.current}
              </Typography>
              <div className={classes.logoutButton}>
                {log}
              </div>
            </Toolbar>
          </AppBar>
          {before}
          <main
            onClick={this.drawercloseer}
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
              {contents}                                  
          </main>
          {after}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

App = withRouter(App);
export default withStyles(styles, { withTheme: true })(App);

/*
*/