import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
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

    return config;
  },
  (error) => Promise.reject(error),
);

// 토큰 갱신 함수
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
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', newRefreshToken);

    // 기본 헤더와 요청 헤더에 새로운 액세스 토큰 설정
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    if (typeof window !== 'undefined') {
      alert('다시 로그인해주세요.');
    }
    throw error; // 에러를 다시 던져서 호출자에게 전달
  }
};

// 응답 인터셉터
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
        return Promise.reject(error); // 에러를 다시 던져서 호출자에게 전달
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
