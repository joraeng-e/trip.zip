import axios, { AxiosError } from 'axios';

import { IS_SERVER } from './constants/server';
import { deleteCookie, getCookie, setCookie } from './utils/cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  const refreshToken = getCookie('refreshToken');

  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  const response = await instance.post('/auth/tokens');

  const { accessToken, refreshToken: newRefreshToken } = response.data;

  // 새로운 토큰 저장
  setCookie('accessToken', accessToken);
  setCookie('refreshToken', newRefreshToken);

  // 기본 헤더와 요청 헤더에 새로운 액세스 토큰 설정
  instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return accessToken;
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config!;

    // 401 오류와 리프레시 토큰이 없는 경우 처리
    if (error.response?.status === 401) {
      const accessToken = await refreshToken();
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return instance(originalRequest);
    }

    return Promise.reject(error);
  },
);

const REFRESH_INTERVAL = 29 * 60 * 1000; // 29분
setInterval(async () => {
  try {
    await refreshToken();
  } catch (error) {
    console.error('주기적인 토큰 갱신 실패:', error);
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    if (!IS_SERVER) {
      alert('다시 로그인해주세요.');
      window.location.replace('/login');
    }
  }
}, REFRESH_INTERVAL);

export default instance;
