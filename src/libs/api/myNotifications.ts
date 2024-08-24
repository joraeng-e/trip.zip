import { GetMyNotificationsResponse } from '@trip.zip-api';

import axiosInstance from '../axiosInstance';
import { getActivityDetail } from './activities';

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

// notification server로 구독 정보 전달
export async function sendSubscriptionToServer({
  id,
  token,
}: {
  id: number;
  token: string;
}) {
  try {
    const response = await fetch(
      'https://trip-zip-notification.vercel.app/subscribe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, token }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
  } catch (error) {
    console.error('Error sending subscription to server:', error);
  }
}

interface SendNotificationParams {
  reservationId: number;
  activityId: number;
  status: 'confirmed' | 'declined';
}

// 예약자 기기로 알림 발송
export async function sendNotification({
  reservationId,
  activityId,
  status,
}: SendNotificationParams) {
  try {
    const activityRes = await getActivityDetail(activityId);
    const body = `${activityRes.title} 예약이 ${status === 'confirmed' ? '승인' : '거절'}되었습니다.`;

    const response = await fetch(
      'https://trip-zip-notification.vercel.app/send-notification',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: reservationId,
          title: '예약 정보에 변경 사항이 있습니다.',
          body,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
  } catch (error) {
    console.error('Error sending subscription to server:', error);
  }
}
