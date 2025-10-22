// // services/api.js
// import axios from 'axios';
// const token = localStorage.getItem('medi_token');
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: token ? { Authorization: `Bearer ${token}` } : {}
// });
// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token to every request if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or wherever you save it
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
