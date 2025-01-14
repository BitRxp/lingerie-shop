import axios from 'axios';
import API_BASE_URL from '../config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Базовий URL до бекенду
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized. Redirecting to login...');
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
      }
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
