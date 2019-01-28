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

function fetch_timeout(method, url, option, nocookie,timeout=10000) {
  let cookies = cookie.parse(document.cookie);
  return Promise.race([
    fetch(BASE_URL + url, Object.assign({
      method: method,
      credentials: !nocookie && 'include',
      headers: {
        "X-CSRFToken": cookies["csrftoken"]
      }}, option)),
    new Promise((_,reject) => setTimeout(() => reject(new Error('timeout')),timeout))
  ]);
}


export default {
  post: (url, option) => {return fetch_timeout('POST', url, option)},
  get: (url, option, nocokie) => {return fetch_extend('GET', url, option, nocokie)},
  fetch: fetch_extend
}

