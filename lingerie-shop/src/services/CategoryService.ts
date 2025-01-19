import axiosInstance from '../utils/axiosInstance';

/**
 * Отримати всі категорії
 * Змінено URL на локальний API
 * @returns Promise з відповіддю від API
 */
export const getAllCategories = async () => {
  return axiosInstance.get('http://127.0.0.1:8080/api/v1/categories');
};

/**
 * Отримати кольори
 * Видалено функцію, оскільки немає ендпоінта для кольорів у списку API
 */
 export const getColors = async () => {
   return axiosInstance.get('/colors');
 };



export const getSizes = async () => {
   return axiosInstance.get('/sizes');
 };
