import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g., http://localhost:3000
  withCredentials: true,                   // automatically send cookies
});

export default api;