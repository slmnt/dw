// using ES6 modules
import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import Bottom from './components/Bottom';
import Left from './components/Left';
import Main from './components/Main';
import Right from './components/Right';
import Top from './components/Top';

import './index.css';

function NoMatch() {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>Please one of links on the left.</p>
    </div>
  );
}

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <HashRouter>
      <CookiesProvider>
      <App>
        <Switch>
          <Route exact path="/"/>
          <Route path="/top" component={Top} />
          <Route path="/right" component={Right} />
          <Route path="/left" component={Left} />
          <Route path="/main" component={Main} color={'test'}/>
          <Route path="/bottom" component={Bottom} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </App>
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
*/