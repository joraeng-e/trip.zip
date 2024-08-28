import {
  GetUserInfoResponse,
  PatchUserInfoRequest,
  PatchUserInfoResponse,
  PostProfileImageResponse,
  RegisterRequest,
  RegisterResponse,
} from '@trip.zip-api';

import axiosInstance from '../axiosInstance';

// 회원가입
export async function postUser(
  userData: RegisterRequest,
): Promise<RegisterResponse> {
  try {
    const response = await axiosInstance.post<RegisterResponse>(
      `/users`,
      userData,
    );

    return response.data;
  } catch (error) {
    console.error('postUser 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 정보 조회
export async function getUser(): Promise<GetUserInfoResponse> {
  try {
    const response = await axiosInstance.get<GetUserInfoResponse>('/users/me');
    return response.data;
  } catch (error) {
    console.error('getUser 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 정보 수정
export async function patchUserInfo(
  userInfo: PatchUserInfoRequest,
): Promise<PatchUserInfoResponse> {
  try {
    const response = await axiosInstance.patch<PatchUserInfoResponse>(
      `/users/me`,
      userInfo,
    );

    return response.data;
  } catch (error) {
    console.error('patchUserInfo 함수에서 오류 발생:', error);
    throw error;
  }
}

// 프로필 이미지 url 생성
export async function postProfileImage(
  imageData: FormData,
): Promise<PostProfileImageResponse> {
  try {
    const response = await axiosInstance.post<PostProfileImageResponse>(
      `/users/me/image`,
      imageData,
    );

    return response.data;
  } catch (error) {
    console.error('postProfileImage 함수에서 오류 발생:', error);
    throw error;
  }
}
