import axios from 'axios';
import { BASE_URL } from '../config'; // Імпортуємо правильний BASE_URL

// Створюємо інстанс axios з базовим URL і стандартними заголовками
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Базовий URL до бекенду
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехоплювач запитів
axiosInstance.interceptors.request.use(
  (config) => {
    // Додаємо токен авторизації, якщо він існує
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Зміна "Basic" на "Bearer", якщо бекенд працює з JWT
    }
    return config;
  },
  (error) => {
    console.error('Error in request:', error);
    return Promise.reject(error);
  }
);

// Перехоплювач відповідей
axiosInstance.interceptors.response.use(
  (response) => response, // Просто повертаємо відповідь, якщо вона успішна
  (error) => {
    if (error.response) {
      // Обробка статусу 401 (Unauthorized)
      if (error.response.status === 401) {
        console.log('Unauthorized. Redirecting to login...');
        localStorage.removeItem('authToken'); // Видаляємо токен
        window.location.href = '/sign-in'; // Редірект на сторінку логіну
      }

      // Виводимо інші помилки
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else {
      console.error('Network Error:', error.message); // Помилка мережі
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
