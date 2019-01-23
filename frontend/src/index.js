// using ES6 modules
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import history from './modules/history';

function Index(props) {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}

render(
  <Router history={history}>
    <Index />
  </Router>
  ,
  document.getElementById('root')
);

/*
*/