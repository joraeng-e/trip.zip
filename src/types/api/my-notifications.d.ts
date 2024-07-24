declare module '@trip.zip-api' {
  // 내 알림 리스트 조회
  export type GetMyNotificationsResponse = {
    cursorId: number;
    notifications: {
      id: number;
      teamId: string;
      userId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
    }[];
    totalCount: number;
  };
}
