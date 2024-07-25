import type { Category, ReservationStatus } from '@trip.zip-api';

declare module '@trip.zip-api' {
  // 체험 리스트 조회
  export type GetActivitiesResponse = {
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

  // 체험 등록
  export type PostActivitiesRequest = {
    title: string;
    category: Category;
    description: string;
    address: string;
    price: number;
    schedules: {
      date: string;
      startTime: string;
      endTime: string;
    }[];
    bannerImageUrl: string;
    subImageUrls: string[];
  };

  export type PostActivitiesResponse = {
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

  // 체험 상세 조회
  export type GetActivityDetailResponse = {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: Category;
    price: number;
    address: string;
    bannerImageUrl: string;
    subImageUrls: {
      id: number;
      imageUrl: string;
    }[];
    schedules: {
      id: number;
      date: string;
      startTime: string;
      endTime: string;
    }[];
    reviewCount: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };

  // 체험 예약 가능일 조회
  export type GetAvailableScheduleResponse = {
    date: string;
    times: {
      endTime: string;
      startTime: string;
      id: number;
    }[];
  }[];

  // 체험 리뷰 조회
  export type GetActivityReviewsResponse = {
    averageRating: number;
    totalCount: number;
    reviews: {
      id: number;
      user: {
        profileImageUrl: string | null;
        nickname: string;
        id: number;
      };
      activityId: number;
      rating: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  // 체험 예약 신청
  export type PostReservationsRequest = {
    scheduleId: number;
    headCount: number;
  };

  export type PostReservationsResponse = {
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

  // 체험 이미지 url 생성
  export type PostActivitiesImageResponse = {
    activityImageUrl: string;
  };
}
