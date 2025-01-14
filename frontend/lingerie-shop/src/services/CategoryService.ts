import axiosInstance from '../utils/axiosInstance';

export const getAllCategories = async () => {
  return axiosInstance.get('/categories');
};

export const getColors = async () => {
  return axiosInstance.get('/colors');
};

export const getSizes = async () => {
  return axiosInstance.get('/sizes');
};
