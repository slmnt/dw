import React, { Component } from 'react';   
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import c2 from './python/course1'
import pl from './python/pythonlobby'
import Pn from './python/pythonNav'
import Cl from './c/cLobby'
import Cn from './c/cNav'
import jl from './Java/JavaLobby'
import Jn from './Java/JavaNav'

class Context extends Component {

  constructor(props){
    super(props)
    this.set = props.set

  }

  render() {
    return (
      <Scrollbars style={{ width: this.props.glContainer.width, height:  this.props.glContainer.height}}>
        <Router>
        <div>
          <Route path="/codemain/home" component={c2} />
          <Route path="/codemain/C" render={() => <Cn  set={this.set}/>}/>
          <Route path="/codemain/C/:id" component={Cl} />
          <Route path="/codemain/Cpp" component={c2} />
          <Route path="/codemain/Python" render={() => <Pn  set={this.set}/>} />
          <Route path="/codemain/Python/:id" component={pl} />
          <Route path="/codemain/Java" render={() => <Jn  set={this.set}/>} />
          <Route path="/codemain/Java/:id" component={jl} />
        </div>
        </Router>
      </Scrollbars>
    );
  }
}

export default Context;