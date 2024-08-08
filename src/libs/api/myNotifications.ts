import { GetMyNotificationsResponse } from '@trip.zip-api';

import axiosInstance from '../axiosInstance';

// 내 알림 리스트 조회
export async function getMyNotifications({
  cursorId,
  size = 10,
}: {
  cursorId?: number;
  size?: number;
} = {}): Promise<GetMyNotificationsResponse> {
  try {
    const params = new URLSearchParams();
    if (cursorId !== undefined) {
      params.append('cursorId', cursorId.toString());
    }
    params.append('size', size.toString());

    const response = await axiosInstance.get<GetMyNotificationsResponse>(
      `/my-notifications`,
      { params },
    );

    return response.data;
  } catch (error) {
    console.error('getMyNotifications 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 알림 삭제
export async function deleteNotification(notificationId: number) {
  try {
    await axiosInstance.delete(`/my-notifications/${notificationId}`);
  } catch (error) {
    console.error('deleteNotification 함수에서 오류 발생:', error);
    throw error;
  }
}
