import axiosInstance from './axios';

export const setAccessTokenHeader = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
