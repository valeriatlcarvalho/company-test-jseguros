import axios from 'axios'

const access_token = 23456789;

export const http = axios.create({
  baseURL: 'http://localhost:3030'
})

http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.headers.post['ACCESS-TOKEN'] = access_token;
http.defaults.headers.post['Accept'] = 'application/json';
