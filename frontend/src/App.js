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

import { Scrollbars } from 'react-custom-scrollbars';

// parts
import Navbar from './components/Navbar';
import Drawer from './components/Drawer'
import Footer from './components/Footer';
import Three from './components/Three';
import Load from './components/Loading'
import Back from './components/BackPlayer'
//import Right from './components/Inter';

// pages
import Main from './components/pages/Main'; 
import Login from './components/pages/Login';
import CreateUser from './components/pages/CreateUser';
import MyPage from './components/pages/MyPage';

import Right from './components/pages/MyLayout';
import Boards from './components/pages/MyProgram';
import Codeman from './components/code/codeman';
import Boardid from './components/pages/BoardGet'
import Tech from './components/pages/Techinfo'
import Mail from './components/pages/EmailCertify'

import CourseEditor from './components/pages/Editor'
import CourseSearch from './components/pages/CourseSearch'
import CourseGet from './components/pages/CourseGet'
import CourseInfo from './components/pages/CourseInfo'

import About from './components/pages/About';
import GettingStarted from './components/pages/GettingStarted';
import Terms from './components/pages/Terms';
import Privacy from './components/pages/Privacy';
import NotFound from './components/pages/NotFound';




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
    if (ok) {
      return <Route {...props} render={render} component={component} />;
    } else {
      return <Route {...props} render={() => <Redirect to={to} />} />;
    }
  }
}

class App extends React.Component {
  state = {
    //uid: '',
    language: 'python',
    //bgm: true,
    //bid: 'GugsCdLHm-Q',
    data: {
      isLoggedIn: false,
      uid: '',
      username: '',
      login: this.login,
      drop: this.drop
    }
  };

  constructor(props){
    super(props);

    this.drawer = React.createRef();

    this.state.data = {
      isLoggedIn: false,
      uid: '',
      username: '',
      login: this.login,
      drop: this.drop
    };

    // console.log(props.history.location.pathname)
    // window.addEventListener('beforeunload',e => this.closewindows(e))
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
    //this.updateLoginState()
  }
  componentDidUpdate(){
  }
  componentWillUnmount(){
  }
  componentDidCatch(error, info){
    console.log('error')
  }


  login = (name, password, callback) => {
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
  loginWithCookie = () => {
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
  logout = () => {

  }
  updateLoginState = () => {
    //this.loginWithCookie();
  }
  checkLoginState = () => {
    /*
      this.state.data.isLoggedIn = false;
      this.state.data.uid = '';
    */
  }
  clearLoginState = () => {
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
  deleteUser = () => {

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

  render() {
    // update rendering
    //<Navbar className="topBar" onClickMenu={() => this.openDrawer()}>
    const { classes, theme } = this.props;

    return (
      <div className="pageContainer">
        <div className="page">
          <MainContext.Provider value={this.state.data}>

            <Navbar className="topBar" onClickMenu={() => this.drawer.current.open()}>
            </Navbar>
            
            <Drawer ref={this.drawer} />

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
                  <Route path="/main" render={() => <Main />}/>

                  <Route path="/right" component={Right} />
                  <Route exact strict path="/Boards" render={() => <Boards go={this.gomypagechild}/>} />
                  <Route exact strict path="/Boards/:id" component={Boardid}/>
                  <Route path="/certify/:code" component={Mail}/>
                  <Route path="/codemain" render={() => <Codeman testprops={this.testprops} get={this.getlan} set={this.setlan}/>}/>
                  <Route path="/three" render={(props) => <Three {...props}/>} />
                  <Route path="/tech"  component={Tech}/>

                  <ProtectedRoute path="/signup"  component={CreateUser} ok={!this.state.data.isLoggedIn} redirectTo="/right"/>
                  <ProtectedRoute path="/login" render={() => <Login />} ok={!this.state.data.isLoggedIn} redirectTo="/right"/>
                  <ProtectedRoute path="/mypage" component={MyPage} ok={this.state.data.isLoggedIn} redirectTo="/login"/>

                  <Route exact strict path="/courseSearch"  component={CourseSearch}/>
                  <Route exact strict path="/course/:id"  component={CourseInfo}/>
                  <ProtectedRoute path="/course/:id/edit"  component={CourseEditor} redirectTo="/login" />                  
                  <Route exact strict path="/course/:id/:number"  component={CourseGet}/>

                  <Route path="/about" component={About}/>
                  <Route path="/getting-started" component={GettingStarted}/>
                  <Route path="/terms" component={Terms}/>
                  <Route path="/privacy" component={Privacy}/>

                  <Route path="/test"  component={CourseInfo} />

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