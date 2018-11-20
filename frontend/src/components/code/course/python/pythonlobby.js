import React, { Component } from 'react';   
import C1 from './course1'
class Lobby extends Component {

    c;

    constructor(props){
      super(props)


    }

    componentDidMount(){
      console.log(this.props.match.params['id'])
      this.c = <C1/>
    }
    
    render() {

      return (
        <div>
          {this.props.match.params['id']}
          {this.c}
        </div>
        );
  	}
}

export default Lobby;