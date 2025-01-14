import axiosInstance from '../utils/axiosInstance';

export const getNewCollection = () => axiosInstance.get('/products/new');
export const getBestSellers = () => axiosInstance.get('/products/bestsellers');
export const getProductsOnSale = () => axiosInstance.get('/products/sale');
export const getTailoringProducts = () => axiosInstance.get('/products/tailoring');
export const searchProducts = (filters: any) => axiosInstance.post('/products/search', filters);
export const getProductById = (id: number) => axiosInstance.get(`/products/${id}`);
