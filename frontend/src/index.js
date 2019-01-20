// using ES6 modules
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


import App from './App';
class Index extends Component {

  render() {
    return(
      <CookiesProvider>
        <App />
      </CookiesProvider>
    );
  }
}

render(
  <BrowserRouter>
      <Index />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

/*
*/