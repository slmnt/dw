import React, { Component } from 'react';   
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import c2 from './python/course1'
import pl from './python/pythonlobby'
import pn from './python/pythonNav'
import cl from './c/cLobby'
import cn from './c/cNav'

class Context extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Scrollbars style={{ width: this.props.glContainer.width, height:  this.props.glContainer.height}}>
      <Router>
      <div>
        <Route path="/codemain/home" component={c2} />
        <Route path="/codemain/C" component={cn} />
        <Route path="/codemain/C/:id" component={cl} />
        <Route path="/codemain/Cpp" component={c2} />
        <Route path="/codemain/Python" component={pn} />
        <Route path="/codemain/Python/:id" component={pl} />
        <Route path="/codemain/Ruby" component={c2} />
        <Route path="/codemain/Java" component={c2} />
      </div>
      </Router>
      </Scrollbars>
    );
  }
}

export default Context;