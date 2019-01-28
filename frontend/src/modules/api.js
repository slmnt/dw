import axios from 'axios';
import cookie from 'cookie';

/* API 要求 モジュール */
const BASE_URL = "http://localhost:8000"

function fetch_extend(method, url, option, nocookie) {
  let cookies = cookie.parse(document.cookie);
  return fetch(BASE_URL + url, Object.assign({
    method: method,
    credentials: !nocookie && 'include',
    headers: {
      "X-CSRFToken": cookies["csrftoken"]
    }
  }, option));
}

export default {
  post: (url, option) => {return fetch_extend('POST', url, option)},
  get: (url, option, nocokie) => {return fetch_extend('GET', url, option, nocokie)},
  fetch: fetch_extend
}

