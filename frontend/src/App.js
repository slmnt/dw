import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';

import './App.css';
import {login, logout} from './modules/main';
import store from './modules/store';
import {MainContext} from './contexts/main';

// UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListItem } from '@material-ui/core';

import { Scrollbars } from 'react-custom-scrollbars';

//
//import Right from './components/Inter';
import NotFound from './components/NotFound';
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
import CourseI from './components/CourseInfo'



axios.defaults.baseURL = '/api/';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';




const drawerWidth = 200;

const styles = theme => ({
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
  }
});


let pages = {
  "mypage": ""
};

class ProtectedRoute extends React.Component {
  render() {
    const { children, render, component, ok, redirectTo, ...props } = this.props;
    const to = redirectTo;
    return (
      <React.Fragment>
        {
          ok ?
            <Route {...props} render={render} component={component} />
          :
            <Route {...props} render={() => <Redirect to={to} />} />
        }
      </React.Fragment>
    )
  }
}

class App extends React.Component {
  state = {
    //uid: '',
    language: 'python',
    //bgm: true,
    //bid: 'GugsCdLHm-Q',
    isDrawerOpen: false,

    data: {
      isLoggedIn: false,
      uid: '',
      username: '',
      logIn: this.logIn,
      drop: this.drop
    }
  };

  constructor(props){
    super(props)

    this.state.data = {
      isLoggedIn: false,
      uid: '',
      username: '',
      logIn: this.logIn,
      drop: this.drop
    }
    this.drawer = React.createRef();


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
  
  componentWillMount(){
    
    this.setState({
      bid: localStorage.getItem("bid")
    })


  }
  componentDidMount(){
  }
  componentDidUpdate(){
  }
  componentWillUnmount(){
  }
  componentDidCatch(error, info){
    console.log('error')
  }


  logIn = (name, password, callback) => {
    //console.log(this.state.password)
    // send allowed true reject false
    axios.post('authentic/',{
      uid: name,
      pwd: password
    }).then(response => {
        console.log(response);
        // console.log(response)
        if(response.status === 200){
            if (callback) callback();
            this.state.data.isLoggedIn = true;
            this.state.data.uid = name;

            this.setState({
              data: this.state.data
            });

            console.log("logged in as: ", this.state.data.uid);
        }else{
        }
    }).catch(e => {
      // console.log(e)
    });
  }
  logInCookie = () => {
    // user platform check
    // console.log(window.navigator.platform)
    let isRoot = this.props.history.location.pathname === '/';
    axios.get('cookieauth/').then((response) => {
      if (response.status === 200){
        this.state.data.isLoggedIn = true;
        this.state.data.uid = response.data;
        this.setState({ data: this.state.data });

        console.log("logged in as: ", this.state.data.uid);
        if (isRoot) {
          //sessionStorage.setItem('key','test')
        }
        
      } else {
        //fail
      }
    }).catch((e) => {

    })
  }
  logOut = () => {

  }
  checkLoginState = () => {
    /*
      this.state.data.isLoggedIn = false;
      this.state.data.uid = '';
    */
  }
  removeLoginState = () => {
    this.state.data.isLoggedIn = false;
    this.state.data.uid = '';
    this.setState({ data: this.state.data });
  }
  drop = () => {
    axios.post('dropliveuser/',{
        uid: this.state.name,
    }).then(response => {
        // console.log(response)
        this.removeLoginState();
    }).catch(e => {
        // console.log(e)
    });
  }

  createUser = (data) => {
    axios.post('createuser/', data).then(response => {
      console.log(response)
    })
  }
  removeUser = () => {

  }





  hideplayer = () => {
    
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



  onClickDrawerItem(e){
    this.closeDrawer();
    this.props.history.push(e)
  }
  

  render() {
    // update rendering
    const { classes, theme } = this.props;

    return (
      <div className="pageContainer">
        <div className="page">
          <MainContext.Provider value={this.state.data}>

            <Navbar className="topBar" onClickMenu={() => this.openDrawer()}>
            </Navbar>
            
            <div
              onClick={this.closeDrawer}
              style={{
                display: this.state.isDrawerOpen ? "block" : "none"
              }}
              className="mobileMenuBg">
            </div>


            <Drawer
              variant="persistent"
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
                <List><ListItem button onClick={e => this.onClickDrawerItem('three')}><Typography>three</Typography></ListItem></List>
                <Divider />
                <List><ListItem button onClick={e => this.onClickDrawerItem('right')}><Typography>right</Typography></ListItem></List>
                <Divider />
                <List><ListItem button onClick={e => this.onClickDrawerItem('main')}><Typography>main</Typography></ListItem></List>
                <Divider />
                <List><ListItem button onClick={e => this.onClickDrawerItem('mypage')}><Typography>mypage</Typography></ListItem></List>
                <Divider />
                <List><ListItem button onClick={e => this.onClickDrawerItem('Boards')}><Typography>Boards</Typography></ListItem></List>
                <Divider />
                <List><ListItem button onClick={e => this.hideplayer()}><Typography>BGM</Typography></ListItem></List>
                <Divider />
                <List><ListItem button onClick={e => {this.state.data.isLoggedIn = true; this.setState({data: this.state.data})}}><Typography>help</Typography></ListItem></List>
              </Scrollbars>
            </Drawer>
            
            
            <main className="content">
              <Scrollbars disablehorizontalscrolling="true" style={{ width: "100%", height: "100%" }}>
                {/*
                setting react router route
                <Route exact path="/"  render={() => <Login test={this.statecallback} />}/>
                */}
                {/*
                <div className={classNames({
                  'hide': this.state.bgm,
                  'player': true
                })}>
                  <Back id={this.state.bid}/>
                </div>
                */}
                <Switch>
                  <Route exact path="/"  render={() => <Main />}/>
                  <Route path="/right" component={Right} />
                  <Route exact strict path="/Boards" render={() => <Boards go={this.gomypagechild}/>} />
                  <Route exact strict path="/Boards/:id" component={Boardid}/>
                  <Route path="/certify/:code" component={Mail}/>
                  <Route path="/main" render={() => <Main />}/>
                  <ProtectedRoute path="/mypage" render={(props) => <Mypage {...props} gogo={this.testprops} set={this.setlan}/>} ok={this.state.data.isLoggedIn} redirectTo="/login"/>
                  <Route path="/codemain" render={() => <Codeman testprops={this.testprops} get={this.getlan} set={this.setlan}/>}/>
                  <Route path="/three" render={(props) => <Three {...props}/>} />
                  <Route path="/tech"  component={Tech}/>
                  <Route exact strict path="/courseSearch"  component={CourseS}/>
                  <Route exact strict path="/courseSearch/:id"  component={CourseI}/>
                  <Route path="/course/:id/edit"  component={CourseE}/>
                  <Route path="/right" component={Right}/>

                  <ProtectedRoute path="/signup"  component={CreateU} ok={!this.state.data.isLoggedIn} redirectTo="/right"/>
                  <ProtectedRoute path="/login" render={() => <Login />} ok={!this.state.data.isLoggedIn} redirectTo="/right"/>
                  <ProtectedRoute path="/mypage" render={(props) => <Mypage {...props} gogo={this.testprops} set={this.setlan}/>} ok={this.state.data.isLoggedIn} redirectTo="/login"/>

                  <Route component={NotFound}/>
                </Switch>
              </Scrollbars>
            </main>


          </MainContext.Provider>
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