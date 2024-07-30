declare module '@trip.zip-api' {
  // 로그인
  export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      nickname: string;
      profileImageUrl: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };

  // 토큰 재발급
  export type RefreshTokenResponse = {
    refreshToken: string;
    accessToken: string;
  };
}
