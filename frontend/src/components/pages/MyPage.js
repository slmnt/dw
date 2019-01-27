import React, { Component } from 'react';
import axios from 'axios';
import styles from './MyPage'

// react-paginatge is crash react meterial-ui
class MyPage extends Component {
    state = {
        userinfo: {}
    };

    constructor(props){
        super(props)

        this.set = props.set
    }

    componentDidMount(){
        axios.get('/user/').then(response => {
            this.setState({userinfo: response.data})
        }).catch((e) => {
            //this.props.history.push('login')
        })        

        axios.post('/test/',{
            contents: "print('test')"
        }).then(response => {
            console.log(response)
        }).catch((e) => {
            console.log(e)
        })        

    }

    convertdata(date){
        var time = new Date(date)
        return time.toLocaleString()
    }

    render() {

        return (
            <div>
            <br/>
            </div>
		);
  	}
}

export default MyPage;