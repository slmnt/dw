import React, { Component } from 'react';   
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class course1 extends Component {

    constructor(props){
        super(props)
        console.log(props.location)

    }

    render() {

        return (
            <Router>
            <div>
              <ul>
                <li>
                  <Link to="/codemain/home">Home</Link>
                </li>
                <li>
                  <Link to="/codemain/about">About</Link>
                </li>
                <li>
                  <Link to="/codemain/topics">Topics</Link>
                </li>
              </ul>
        
              <hr />
        
              <Route exact path="/codemain/home" component={Home} />
              <Route path="/codemain/about" component={About} />
              <Route path="/codemain/topics" component={Topics} />
            </div>
            </Router>
        );
  	}
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default course1;