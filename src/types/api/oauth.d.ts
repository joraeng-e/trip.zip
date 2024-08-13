declare module '@trip.zip-api' {
  type User = {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };

  // 간편 회원가입
  type SignUpRequest = {
    nickname: string;
    redirectUri?: string;
    token?: string;
  };

  type SignUpResponse = {
    user: User;
    refreshToken: string;
    accessToken: string;
  };

  // 간편 로그인
  type SignInRequest = {
    redirectUri: string;
    token: string;
  };

  type SignInResponse = {
    user: User;
    refreshToken: string;
    accessToken: string;
  };
}
