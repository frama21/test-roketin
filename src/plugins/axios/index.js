// Axios
import axios from 'axios';

const http = axios.create({
  // baseURL: import.meta.env.VITE_APP_API_URL ? `${import.meta.env.VITE_APP_API_URL}/api` : '/api',
});

http.interceptors.request.use(async config => {
  return config;
});

http.interceptors.response.use(undefined, err => {
  if (import.meta.env.DEV) {
    console.log('[HTTP Error]', err);
  }
  return Promise.reject(err);
});

export default http;
