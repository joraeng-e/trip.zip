import axios from 'axios';

import { deleteCookie, getCookie, setCookie } from './utils/cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      if (config.headers['Content-Type'] === 'multipart/form-data') {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 오류와 리프레시 토큰이 없는 경우 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie('refreshToken');

        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // 리프레시 토큰을 사용해 새로운 액세스 토큰 요청
        const response = await instance.post('/auth/refresh-token', {
          refreshToken: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 새로운 토큰 저장
        setCookie('accessToken', accessToken, 0.0208);
        setCookie('refreshToken', newRefreshToken, 0.0208);

        // 기본 헤더와 요청 헤더에 새로운 액세스 토큰 설정
        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        alert('다시 로그인해주세요.');
      }
    }
    alert(`ERROR: ${error.response.data.message}`);
    return Promise.reject(error);
  },
);

export default instance;
