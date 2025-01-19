// src/services/ProductService.ts

import axiosInstance from '../utils/axiosInstance';

/**
 * Отримати нову колекцію товарів
 * Відповідає ендпоінту: /products/new
 */
export const getNewCollection = () => axiosInstance.get('/products/new');

/**
 * Отримати найкращі товари (Best Sellers)
 * Відповідає ендпоінту: /products/bestsellers
 */
export const getBestSellers = () => axiosInstance.get('/products/bestsellers');

/**
 * Отримати товари зі знижками
 * Відповідає ендпоінту: /products/on-sales
 */
export const getProductsOnSale = () => axiosInstance.get('/products/on-sales');

/**
 * Отримати товари для індивідуального пошиття
 * Відповідає ендпоінту: /products/tailoring
 */
export const getTailoringProducts = () => axiosInstance.get('/products/tailoring');

/**
 * Пошук товарів за фільтрами
 * Відповідає ендпоінту: /products/search
 * @param filters Об'єкт із фільтрами для пошуку
 */
export const searchProducts = (filters: any) => axiosInstance.post('/products/search', filters);

/**
 * Отримати інформацію про товар за його ID
 * Відповідає ендпоінту: /products/{id}
 * @param id Унікальний ідентифікатор товару
 */
export const getProductById = (id: number) => axiosInstance.get(`/products/${id}`);
