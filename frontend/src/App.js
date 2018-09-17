import React, { Component } from 'react';
import NavLink from './components/Navlint';
import PropTypes from 'prop-types';


document.addEventListener("keypress", event => {
    console.log(event)
})

function App(props) {
    return (
      <div>
        <header>
          <h1>React Splitter Layout</h1>
          <p>A split layout for React and modern browsers.</p>
        </header>
        <div className="main">
          <nav className="navigation-bar">
            <ul className="navigation">
              <li><NavLink to="/bottom">bottom </NavLink></li>
              <li><NavLink to="/top">top</NavLink></li>
              <li><NavLink to="/right">right</NavLink></li>
              <li><NavLink to="/left">left</NavLink></li>
              <li><NavLink to="/main">main</NavLink></li>
            </ul>
          </nav>
          <div className="child-content">
            {props.children}
          </div>
        </div>
        <footer>Licensed under MIT</footer>
      </div>
    );
  }
  
  App.propTypes = {
    children: PropTypes.element.isRequired
  };
  
export default App;
  