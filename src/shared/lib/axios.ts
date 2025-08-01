import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 응답 에러 처리
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       console.warn('인증 실패: 로그인 다시 필요');
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
