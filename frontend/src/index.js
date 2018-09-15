import axios from 'axios';

axios.get('/api/').then(resp => {
  console.log('Response', resp)
}).catch(err => {
  console.log('Error', err.response.status)
});
