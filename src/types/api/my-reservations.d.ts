import type { ReservationStatus } from '@trip.zip-api';


declare module '@trip.zip-api' {
  // 내 예약 리스트 조회
  export type GetMyReservationsResponse = {
    cursorId: number | null;
    reservations: {
      id: number;
      teamId: string;
      userId: number;
      activity: {
        bannerImageUrl: string;
        title: string;
        id: number;
      };
      scheduleId: number;
      status: ReservationStatus;
      reviewSubmitted: boolean;
      totalPrice: number;
      headCount: number;
      date: string;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
    }[];
    totalCount: number;
  };

  export type ReservationActivity = {
    id: number;
    title: string;
    bannerImageUrl: string;
  };

  export type Reservation = {
    id: number;
    teamId: string;
    userId: number;
    activity: ReservationActivity;
    scheduleId: number;
    status: ReservationStatus;
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  };

  // 내 예약 수정 (취소)
  export type PatchMyReservationRequest = {
    status: 'canceled';
  };

  export type PatchMyReservationResponse = {
    id: number;
    teamId: string;
    userId: number;
    activityId: number;
    scheduleId: number;
    status: ReservationStatus;
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  };

  // 내 예약 리뷰 작성
  export type PostReviewRequest = {
    rating: number;
    content: string;
  };

  export type PostReviewResponse = {
    deletedAt: string | null;
    updatedAt: string;
    createdAt: string;
    content: string;
    rating: number;
    userId: number;
    activityId: number;
    teamId: string;
    id: number;
  };
}