// using ES6 modules
import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import App from './App';
class Index extends Component {
  constructor(props) {
    super(props);
    console.log("running")
  }

  render() {
    return(
    <HashRouter>
      <CookiesProvider>
        <Switch>
        <App />
        </Switch>
      </CookiesProvider>
    </HashRouter>        
    );
  }
}

render(
  <Index />,
  document.getElementById('root')
);

/*
import Bottom from './components/Bottom';
import Left from './components/Left';
import Main from './components/Main';
import Right from './components/Right';
import Top from './components/Top';


function NoMatch() {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>Please one of links on the left.</p>
    </div>
  );
}

  <Route exact path="/"/>
  <Route path="/top" component={Top} />
  <Route path="/right" component={Right} />
  <Route path="/left" component={Left} />
  <Route path="/main" component={Main} color={'test'}/>
  <Route path="/bottom" component={Bottom} />
  <Route path="*" component={NoMatch} />

*/