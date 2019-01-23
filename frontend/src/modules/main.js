

import axios from 'axios';
import store from './store';

export function login() {

}

export function logout() {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  axios.get('/api/logout/').then(response => {
    this.setState({
      login: false
    })
    this.clicked('/')
  })
}

