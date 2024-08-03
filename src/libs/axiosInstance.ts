import axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config!;

    // 401 오류와 리프레시 토큰이 없는 경우 처리
    if (error.response?.status === 401) {
      try {
        const refreshToken = getCookie('refreshToken');

        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // 서버에 리프레시 토큰 요청
        const response = await instance.post('/auth/tokens', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        setCookie('accessToken', accessToken);
        setCookie('refreshToken', newRefreshToken);

        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        if (typeof window !== 'undefined') {
          alert('다시 로그인해주세요.');
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
