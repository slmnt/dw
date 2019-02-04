import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import queryString from 'query-string';
import axios from 'axios';




import api from './modules/api';
import history from './modules/history';

import './App.css';
import {MainContext} from './contexts/main';

// UI
import { Scrollbars } from 'react-custom-scrollbars';

// parts
import Navbar from './components/Navbar';
import Drawer from './components/Drawer'
import Footer from './components/Footer';
import Load from './components/Loading'
//import Right from './components/Inter';

// pages
import Main from './components/pages/Main'; 
import Login from './components/pages/Login';
import CreateUser from './components/pages/CreateUser';
import UserInfo from './components/pages/UserInfo';
import UserSearch from './components/pages/UserSearch'

import Right from './components/pages/MyLayout';
import Tech from './components/pages/Techinfo'
import EmailVerify from './components/pages/EmailVerify'

import CourseEditor from './components/pages/Editor'
import CourseSearch from './components/pages/CourseSearch'
import CourseGet from './components/pages/CourseGet'
import CourseInfo from './components/pages/CourseInfo'

import Forum from './components/pages/Forum';

import About from './components/pages/About';
import GettingStarted from './components/pages/GettingStarted';
import Terms from './components/pages/Terms';
import Privacy from './components/pages/Privacy';
import NotFound from './components/pages/NotFound';



axios.defaults.baseURL = '/api';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class ProtectedRoute extends React.Component {
  setParam(url, params) {
    if (this.props.processRedirect) {
      // props.path から出る際, ?redirect= があれば移動
      const parsed = queryString.parse(history.location.search);
      if (parsed.redirect) return parsed.redirect;
    }
    if (this.props.redirectBack) {
      // redirect する際, ?redirect= に元の path (props.path) を格納
      params = params || [];
      params.redirect = history.location.pathname;
    }
    if (!params) return url;
    return url + "?" + queryString.stringify(params);
  }
  render() {
    const { children, render, component, ok, redirectTo, processRedirect, redirectBack, params, ...props } = this.props;
    const to = redirectTo;
    if (ok) {
      return <Route {...props} render={render} component={component} />;
    } else {
      return <Route {...props} render={() => <Redirect to={this.setParam(to, params)} />} />;
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
      logout: this.logout,
      createUser: this.createUser,
    },
    
  };

  constructor(props){
    super(props);

    this.drawer = React.createRef();
    this.scrollbar = React.createRef();

    this.state.data = {
      isLoggedIn: false,
      uid: '',
      username: '',
      login: this.login,
      logout: this.logout,
      createUser: this.createUser,
    };

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
    document.addEventListener('mousewheel',this.onScroll)
    //this.updateLoginState(); // クッキーが存在 & 期限が切れていないとき
    this.loginWithCookie(); // クッキーが存在 & 期限が切れているとき
  }
  componentDidMount(){

  }

  onScroll = (e) => {
    // console.log(this.scrollbar.current.getValues())
  }

  componentDidUpdate(){
  }
  componentWillUnmount(){
    document.removeEventListener('mousewheel',this.onScroll)
  }
  componentDidCatch(error, info){
    console.log('error')
  }


  login = (name, password, callback) => {
    //console.log(name, password)
    axios.post('authentic/',{
      uid: name,
      pwd: password
    }).then(response => {
        console.log(response);
        // console.log(response)
        if(response.status === 200){
          this.state.data.isLoggedIn = true;
          this.state.data.uid = name;
          
          this.setState({
            data: this.state.data
          }, () => {
            if (callback) callback();
            console.log("logged in as: ", this.state.data.uid);
          });
          
        }else{
        }
    }).catch(e => {
      console.log("error: authentic/", e)
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

        // console.log("logged in as: ", this.state.data.uid);
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
  logout = () => {
    axios.post('logout/').then(response => {
        // console.log(response)
        this.clearLoginState();
    }).catch(e => {
        console.log("error: logout", e)
    });
  }

  createUser = async (data, callback) => {
    await api.ex_post('/api/createuser/', data)
    .then(response => {
      if(response.status === 200){
        return api.parseJson(response);
      } else {
        throw new Error(response);
      }
    })
    .then(response => {
        this.state.data.isLoggedIn = true;
        this.state.data.uid = response.uid;

        this.setState({
          data: this.state.data
        }, () => {
          if (callback) callback();
          console.log("created & logged in as: ", this.state.data.uid);
        });
    }).catch(e => {
      console.log("error: createuser", e)
    });

  }

  deleteUser = () => {
    api.post('/api/deleteuser/',{
    }).then(api.parseJson)
    .then(response => console.log('Success:', response))
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
      <div className="page">
        <MainContext.Provider value={this.state.data}>

          <Navbar className="topBar" onClickMenu={() => this.drawer.current.open()}>
          </Navbar>
          
          <Drawer ref={this.drawer}/>

          <main className="content">
            <Scrollbars ref={this.scrollbar} className="react-scrollbar" disablehorizontalscrolling="true" style={{ width: "100%", height: "100%" }}>
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
                <Route path="/main" render={() => <Main />}/>
                <Route path="/right" component={Right} />
                <Route path="/tech"  component={Tech}/>
                <Route path="/test"  component={CourseInfo} />
              */}
              <Switch>
                <Route exact path="/"  render={() => <Main />}/>

                <Route path="/verify/:code" component={EmailVerify}/>

                <ProtectedRoute path="/signup"  component={CreateUser} ok={!this.state.data.isLoggedIn} redirectTo="/mypage" processRedirect/>
                <ProtectedRoute path="/login" render={() => <Login />} ok={!this.state.data.isLoggedIn} redirectTo="/mypage" processRedirect/>
                <ProtectedRoute path="/mypage" render={() => <UserInfo isMyPage={true} />} ok={this.state.data.isLoggedIn} redirectTo="/login" redirectBack/>
                
                <Route path="/search/user"  component={UserSearch}/>
                <Route path="/user/:id"  component={UserInfo}/>

                <Route path="/search/course"  render={()=> <CourseSearch/>}/>
                <Route exact strict path="/courseSearch" component={CourseSearch}/>
                <Route path="/course/:name/:id/edit"  component={CourseEditor} redirectTo="/login" />                  
                <Route path="/course/:name/:id/:ch"  component={CourseGet}/>
                <Route path="/course/:name/:id"  component={CourseInfo}/>

                <Route path="/forum"  component={Forum}/>

                <Route path="/about" component={About}/>
                <Route path="/getting-started" component={GettingStarted}/>
                <Route path="/terms" component={Terms}/>
                <Route path="/privacy" component={Privacy}/>

                <Route path="/help"  component={NotFound}/>
                <Route path="/settings"  component={NotFound}/>

                <Route component={NotFound}/>
              </Switch>
            </Scrollbars>
          </main>
        </MainContext.Provider>
      </div>
    );
  }
}

App.propTypes = {};

App = withRouter(App);
export default App;

/*
*/ 