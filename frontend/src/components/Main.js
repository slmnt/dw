import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  temp = 10;

  constructor(props) {
    super(props);

    // must need write this line before use cookies
    const { cookies } = props;
    
    cookies.set('test',100)
    // console.log(cookies.get('test'))

    this.state = {value: '', color: 'green'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    navigator.geolocation.getCurrentPosition(this.showposition,this.rejctpermission)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  showposition(position){
    // console.log(position.coords.latitude +':' + position.coords.longitude)
  }
  rejctpermission(error){
    console.log(error.message)
  }
  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    // event.preventDefault();

    //axios.defaults.xsrfCookieName = 'csrftoken';
    // axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    //axios.post('/api/python/',{contents: this.state.value}).then(response => {
      //console.log(response)
      //this.setState({value: ''})
    //}).catch(e => {
      //console.log(e)
    //})
  }
  
	getInitialState() {
		return {
			code: "// Code",
		};
	}
  componentDidUpdate(){

  }
  componentWillUnmount(){
  }
  componentDidCatch(){

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
  
export default withCookies(Main)