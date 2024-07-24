declare module '@trip.zip-api' {
  // 로그인
  export type LoginResponse = {
    email: string;
    password: string;
  };

  // 토큰 재발급
  export type RefreshTokenResponse = {
    refreshToken: string;
    accessToken: string;
  };
}
