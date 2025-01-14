import axiosInstance from '../utils/axiosInstance';

// Реєстрація користувача
export const registerUser = async (userData: any) => {
  return await axiosInstance.post('/users/register', userData);
};

// Отримати всіх користувачів
export const getAllUsers = async () => {
  return await axiosInstance.get('/users');
};

// Отримати користувача за ID
export const getUserById = async (id: number) => {
  return await axiosInstance.get(`/users/${id}`);
};

// Видалити користувача
export const deleteUser = async (id: number) => {
  return await axiosInstance.delete(`/users/${id}`);
};

// Отримати користувача за email
export const getUserByEmail = async (email: string) => {
  return await axiosInstance.get(`/users/email/${email}`);
};
