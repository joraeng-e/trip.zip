import { LoginResponse, RefreshTokenResponse } from '@trip.zip-api';

import instance from '../axiosInstance';

// 로그인
export async function postLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const response = await instance.post<LoginResponse>(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('postLogin 함수에서 오류 발생:', error);
    throw error;
  }
}

// 토큰 재발급
export async function postRefreshTokens(): Promise<RefreshTokenResponse> {
  try {
    const response = await instance.post<RefreshTokenResponse>('/auth/tokens');
    return response.data;
  } catch (error) {
    console.error('postRefreshTokens 함수에서 오류 발생:', error);
    throw error;
  }
}
