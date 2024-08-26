import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const excludedUrls = ['/auth/tokens'];
    if (excludedUrls.some((url) => config.url?.includes(url))) {
      return config;
    }

    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (config.data && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const refreshToken = async () => {
  const refreshToken = getCookie('refreshToken');

  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  try {
    const response = await axiosInstance.post(
      '/auth/tokens',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새로운 토큰 저장
    setCookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
    setCookie('refreshToken', newRefreshToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });

    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    if (typeof window !== 'undefined') {
      alert('다시 로그인해주세요.');
    }
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401) {
      try {
        const accessToken = await refreshToken();

        // 새로운 액세스 토큰으로 헤더 업데이트 및 원래 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
