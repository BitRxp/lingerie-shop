import axiosInstance from '../utils/axiosInstance';

/**
 * Логін користувача
 * Змінено URL на локальний API
 * @param credentials Об'єкт з email і password
 * @returns Promise з відповіддю від API
 */
export const loginUser = async (credentials: { email: string; password: string }) => {
  return axiosInstance.post('http://127.0.0.1:8080/api/v1/auth/login', credentials);
};

/**
 * Реєстрація користувача
 * Змінено URL на локальний API
 * @param userData Об'єкт з даними користувача
 * @returns Promise з відповіддю від API
 */
export const registerUser = async (userData: { email: string; password: string; name: string; surname: string }) => {
  return axiosInstance.post('http://127.0.0.1:8080/api/v1/auth/register', userData);
};
