import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@trip.zip-api';

import axiosInstance from '../axiosInstance';

// 간편 회원가입
export async function SignUpUser(
  provider: 'google' | 'kakao',
  signUpData: SignUpRequest,
): Promise<SignInResponse> {
  try {
    const response = await axiosInstance.post<SignUpResponse>(
      `/oauth/sign-up/${provider}`,
      signUpData,
    );

    return response.data;
  } catch (error) {
    console.error('postUser 함수에서 오류 발생:', error);
    throw error;
  }
}

// 간편 로그인
export async function signInUser(
  provider: 'google' | 'kakao',
  signInData: SignInRequest,
): Promise<SignInResponse> {
  try {
    const response = await axiosInstance.post<SignInResponse>(
      `/oauth/sign-in/${provider}`,
      signInData,
    );

    return response.data;
  } catch (error) {
    console.error('signInUser 함수에서 오류 발생:', error);
    throw error;
  }
}
