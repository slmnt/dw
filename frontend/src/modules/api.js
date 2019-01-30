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

function fetch_post(url,body,timeout=10000) {
  let cookies = cookie.parse(document.cookie);
  let formData = new FormData();
  for(let dict in body){
    formData.append(dict,body[dict])
  }

  return Promise.race([
    fetch(BASE_URL + url, Object.assign({
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        "X-CSRFToken": cookies["csrftoken"]
      }})),
    new Promise((_,reject) => setTimeout(() => reject(new Error('timeout')),timeout))
  ]);
}

function parseJson(response) {
  if (!response.ok) {
    console.log("api network error:", response.status, response.statusText, response);
    return;
  }

  let r;
  try {
    r = response.json();
  } catch (e) {
    console.log(e)
  }
  return r;
}


export default {
  post: (url, option) => {return fetch_timeout('POST', url, option)},
  ex_post: (url, body) => {return fetch_post(url,body)},
  get: (url, option, nocokie) => {return fetch_extend('GET', url, option, nocokie)},
  fetch: fetch_extend,
  parseJson,
}

