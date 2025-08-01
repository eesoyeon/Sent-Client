import { useEffect } from 'react';
import axiosInstance from './axios';

export const useAuthInterceptor = () => {
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(config => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, []);
};
