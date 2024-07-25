import type { Category, ReservationStatus } from '@trip.zip-api';

declare module '@trip.zip-api' {
  // 내 체험 리스트 조회
  export type GetMyActivitiesResponse = {
    cursorId: number | null;
    totalCount: number;
    activities: {
      id: number;
      userId: number;
      title: string;
      description: string;
      category: Category;
      price: number;
      address: string;
      bannerImageUrl: string;
      rating: number;
      reviewCount: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  // 내 체험 월별 예약 현황 조회
  export type GetMyActivitiesReservationDashboardResponse = {
    date: string;
    reservations: {
      completed: number;
      confirmed: number;
      pending: number;
    };
  }[];

  // 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
  export type GetMyActivitiesReservedScheduleResponse = {
    scheduleId: number;
    startTime: string;
    endTime: string;
    count: {
      declined: number;
      confirmed: number;
      pending: number;
    };
  }[];

  // 내 체험 예약 시간대별 예약 내역 조회
  export type GetMyActivitiesReservationsResponse = {
    cursorId: number | null;
    totalCount: number;
    reservations: {
      id: number;
      nickname: string;
      userId: number;
      teamId: string;
      activityId: number;
      scheduleId: number;
      status: string;
      reviewSubmitted: boolean;
      totalPrice: number;
      headCount: number;
      date: string;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  // 내 체험 예약 상태(승인, 거절) 업데이트
  export type PatchMyActivitiesReservationRequest = {
    status: 'declined' | 'confirmed';
  };

  export type PatchMyActivitiesReservationResponse = {
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

  // 내 체험 수정
  export type PatchMyActivityRequest = {
    title: string;
    category: Category;
    description: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    subImageIdsToRemove: number[];
    subImageUrlsToAdd: string[];
    scheduleIdsToRemove: number[];
    schedulesToAdd: {
      date: string;
      startTime: string;
      endTime: string;
    }[];
  };

  export type PatchMyActivityResponse = {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: Category;
    price: number;
    address: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
    subImages: {
      imageUrl: string;
      id: number;
    }[];
    schedules: {
      times: {
        endTime: string;
        startTime: string;
        id: number;
      }[];
      date: string;
    }[];
  };
}
