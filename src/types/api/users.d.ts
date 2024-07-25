declare module '@trip.zip-api' {
  // 회원가입
  export type RegisterRequest = {
    email: string;
    nickname: string;
    password: string;
  };

  export type RegisterResponse = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };

  // 내 정보 조회
  export type GetUserInfoResponse = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };

  // 내 정보 수정
  export type PatchUserInfoRequest = {
    nickname: string;
    profileImageUrl: string | null;
    newPassword: string;
  };

  export type PatchUserInfoResponse = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };

  // 프로필 이미지 url 생성
  export type PostProfileImageResponse = {
    profileImageUrl: string;
  };
}
