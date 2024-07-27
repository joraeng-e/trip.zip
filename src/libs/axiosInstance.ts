import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')?.replace(/"/gi, '');

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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage
          .getItem('refreshToken')
          ?.replace(/"/gi, '');

        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // 새로운 accessToken 요청
        const response = await instance.post('/auth/refresh-token', {
          refreshToken: refreshToken,
        });
        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    }
    alert(`ERROR: ${error.response.data.message}`);
    return Promise.reject(error);
  },
);

export default instance;
