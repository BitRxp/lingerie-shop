// src/services/UserService.ts

import axiosInstance from '../utils/axiosInstance';

/**
 * Реєстрація користувача
 * Відповідає ендпоінту: /auth/register
 * @param userData Об'єкт із даними користувача
 * @returns Promise з відповіддю від API
 */
export const registerUser = async (userData: any) => {
  return await axiosInstance.post('/auth/register', userData);
};

/**
 * Отримати всіх користувачів
 * Відповідає ендпоінту: /user/profile
 * (Ваша API документація не вказує ендпоінт для всіх користувачів)
 * Можливо, потрібно видалити цей метод, якщо він не підтримується бекендом.
 */
export const getAllUsers = async () => {
  console.warn("This endpoint is not defined in the provided API documentation.");
  return await axiosInstance.get('/users');
};

/**
 * Отримати користувача за ID
 * (Ендпоінт не вказаний у документації, перевірте його існування)
 * @param id Унікальний ідентифікатор користувача
 */
export const getUserById = async (id: number) => {
  console.warn("This endpoint is not defined in the provided API documentation.");
  return await axiosInstance.get(`/users/${id}`);
};

/**
 * Видалити користувача
 * (Ендпоінт не вказаний у документації, перевірте його існування)
 * @param id Унікальний ідентифікатор користувача
 */
export const deleteUser = async (id: number) => {
  console.warn("This endpoint is not defined in the provided API documentation.");
  return await axiosInstance.delete(`/users/${id}`);
};

/**
 * Отримати користувача за email
 * (Ендпоінт не вказаний у документації, перевірте його існування)
 * @param email Електронна адреса користувача
 */
export const getUserByEmail = async (email: string) => {
  console.warn("This endpoint is not defined in the provided API documentation.");
  return await axiosInstance.get(`/users/email/${email}`);
};
