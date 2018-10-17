import React, { Component } from 'react';   
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import c2 from './course2'
class course1 extends Component {

    constructor(props){
      super(props)
    }

    render() {
      return (
           <Scrollbars style={{ width: this.props.glContainer.width, height:  this.props.glContainer.height}}>
            <Router>
            <div>
              <Route path="/codemain/home" component={c2} />
              <Route path="/codemain/C" component={c2} />
              <Route path="/codemain/C/:id" component={c2} />
              <Route path="/codemain/Cpp" component={c2} />
              <Route path="/codemain/Python" component={c2} />
              <Route path="/codemain/Ruby" component={c2} />
              <Route path="/codemain/Java" component={c2} />
            </div>
            </Router>
            </Scrollbars>
        );
  	}
}


export default course1;