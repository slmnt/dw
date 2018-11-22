import React, { Component } from 'react';   
import C1 from './course1'
import C2 from './course2'
import C3 from './course3'

class Lobby extends Component {

  course;

  constructor(props){
    super(props)

  }

  componentDidMount(){
    switch(this.props.match.params['id']){
      case "1":
        this.course = <C1/>
        break;
      case "2":
        this.course = <C2/>
        break;
      case "3":
        this.course = <C3/>
        break;
    }
  }
    
  render() {

    return (
      <div>
        {this.props.match.params['id']}
        {this.course}
      </div>
      );
  }
}

export default Lobby;