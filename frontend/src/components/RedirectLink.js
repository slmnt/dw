import React, { Component } from 'react';   
import queryString from 'query-string';
import history from '../modules/history';

class RedirectLink extends Component {
  onClick = e => {
    if (this.props.to.replace(/\/*$/g, '') == history.location.pathname.replace(/\/*$/g, '')) {
      history.push(this.props.to);
    } else {
      history.push(this.props.to + "?" + queryString.stringify({redirect: history.location.pathname}));
    }
  }
  render() {
    return (
      <a onClick={this.onClick}>
        {this.props.children}
      </a>
    )
  }
}

export default RedirectLink;