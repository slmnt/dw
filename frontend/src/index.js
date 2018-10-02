// using ES6 modules
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


import App from './App';
class Index extends Component {
  constructor(props) {
    super(props);
    // console.log("running")
  }

  render() {
    return(
      <CookiesProvider>
        <Switch>
        <App />
        </Switch>
      </CookiesProvider>
    );
  }
}

render(
  <BrowserRouter >
  <Index />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

/*
*/