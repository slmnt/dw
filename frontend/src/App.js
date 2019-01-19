import React from 'react';
import ReactDOM from 'react-dom';
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

import './App.css'


//import Right from './components/Inter';
import Navbar from './components/Navbar';
import CreateU from './components/CreateUser';
import Main from './components/Main'; 
import Right from './components/Mylayout';
import Boards from './components/MyProgram';
import Three from './components/three';
import Login from './components/Login';
import Mypage from './components/mypage';
import Codeman from './components/code/codeman';
import Boardid from './components/Boardget'
import Load from './components/Loading'
import Back from './components/BackPlayer'
import Tech from './components/Techinfo'
import Mail from './components/Email_certify'
import CourseS from './components/CourseSearch'
import CourseE from './components/Editor'

const drawerWidth = 200;

const styles = theme => ({
  appBar: {
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
    marginLeft: 6,
    marginRight: 10,
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
  appbarhis:{
    position: 'relative',
    left: -10
  },
  logoutButton: {
    position: 'absolute',
    left: '92%'
  }
});




class App extends React.Component {
  state = {
    anchor: 'left',
    login: false,
    uid: '',
    current: '',
    language: 'python',
    bgm: true,
    bid: 'GugsCdLHm-Q',
    isDrawerOpen: false,
  };

  constructor(props){
    super(props)

    this.drawer = React.createRef();
    
    this.hideplayer = this.hideplayer.bind(this)
    // console.log(props.history.location.pathname)

    // window.addEventListener('beforeunload',e => this.closewindows(e))
  }

  openDrawer = e => {
    /*
        let rect = element.getBoundingClientRect();
        element.style.width = rect.width + "px";
        element.style.height = rect.height + "px";
    */
    this.setState({isDrawerOpen: true});
  }
  closeDrawer = e => {
    this.setState({isDrawerOpen: false});
  }
  getComponentSize(com) {
    let dom = ReactDOM.findDOMNode(com);
    return dom.getBoundingClientRect();
  }

  setlan = (l) => {
    this.setState({ language: l})
  }

  getlan = () => {
    return this.state.language
  }

  drop = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.get('/api/logout/').then(response => {
      this.setState({
        login: false
      })
      this.clicked('/')
    })
  }
  
  componentWillMount(){
    
    this.setState({
      bid: localStorage.getItem("bid")
    })

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
          sessionStorage.setItem('key','test')
          
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


  hideplayer(){
    
    if(this.state.bgm){
      this.setState({
        bgm: false
      })
    }else{
      this.setState({
        bgm: true
      })
    }
    
    // reload set bid and refresh page
    // localStorage.setItem('bid', 'bHQqvYy5KYo')
    // window.location.reload();
  }


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

  gomypage = (e) => {

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

  gomypagechild = (e) => {

    this.setState({current: e})
    this.props.location.pathname = '/' + e
    this.props.history.push(e)
  }

  testprops = () => {
    // console.log(this.state.current)
  }


  render() {
    // update rendering
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

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
          <IconButton onClick={this.closeDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      </Drawer>
    );

    const logout = (
      <Button color="inherit" onClick={this.drop}>Logout</Button>
    );

    const login = (
      <Button color="inherit" onClick={e => this.clicked('login')}>Login</Button>
    );

    let log = null

    if(this.state.login){
      log = logout
    } else{
      log = login
    }

    return (
      <div className="pageContainer">
        <div className="page">

          {/*
          <Navbar className="topBar" />
          */}
          

          <AppBar
            position='sticky'
            className="topBar"
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.openDrawer}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.appbarhis} color="inherit" noWrap>
                {this.state.current}
              </Typography>
              <div className={classes.logoutButton}>
                {log}
              </div>
            </Toolbar>
          </AppBar>
          
          
          <div
            onClick={this.closeDrawer}
            style={{
              display: this.state.isDrawerOpen ? "block" : "none"
            }}
            className="mobileMenuBg">
          </div>


          <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            className="mobileMenu"
            style={{
              left: this.state.isDrawerOpen ? 0 : -1000 + "px"
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
            ref={this.drawer}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.closeDrawer}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Scrollbars style={{ height: "90vh" }}>        
            <Divider />
            <List><ListItem button onClick={e => this.clicked('three')}><Typography>three</Typography></ListItem></List>
            <Divider />
            <List><ListItem button onClick={e => this.clicked('right')}><Typography>right</Typography></ListItem></List>
            <Divider />
            <List><ListItem button onClick={e => this.clicked('main')}><Typography>main</Typography></ListItem></List>
            <Divider />
            <List><ListItem button onClick={e => this.gomypage('mypage')}><Typography>mypage</Typography></ListItem></List>
            <Divider />
            <List><ListItem button onClick={e => this.clicked('Boards')}><Typography>Boards</Typography></ListItem></List>
            <Divider />
            <List><ListItem button onClick={e => this.hideplayer()}><Typography>BGM</Typography></ListItem></List>
            <Divider />
            <List><ListItem button><Typography>help</Typography></ListItem></List>
            </Scrollbars>
          </Drawer>
          
          
          <main className="content">
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100%", height: "100%" }}>
              {/*
              setting react router route
              <Route exact path="/"  render={() => <Login test={this.statecallback} />}/>
              */}
              <div className={classNames({
                'hide': this.state.bgm,
                'player': true
              })}>
                <Back id={this.state.bid}/>
              </div>
              <Route exact path="/"  render={() => <Main />}/>
              <Route path="/right" component={Right} />
              <Route path="/Boards" render={() => <Boards go={this.gomypagechild}/>} />
              <Route path="/Board/:id" component={Boardid}/>
              <Route path="/certify/:code" component={Mail}/>
              <Route path="/main" component={Main}/>
              <Route path="/mypage" render={(props) => <Mypage {...props} gogo={this.testprops} set={this.setlan}/>} />
              <Route path="/codemain" render={() => <Codeman testprops={this.testprops} get={this.getlan} set={this.setlan}/>}/>
              <Route path="/three" render={(props) => <Three {...props}/>} />
              <Route path="/login"  render={() => <Login test={this.statecallback} />}/>
              <Route path="/createuser"  component={CreateU}/>
              <Route path="/tech"  component={Tech}/>
              <Route path="/courseSearch"  component={CourseS}/>
              <Route path="/course/:id/edit"  component={CourseE}/>
            </Scrollbars>
          </main>



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