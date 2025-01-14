import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (credentials: { email: string; password: string }) => {
  return axiosInstance.post('/auth/login', credentials);
};

export const registerUser = async (userData: any) => {
  return axiosInstance.post('/auth/register', userData);
};
