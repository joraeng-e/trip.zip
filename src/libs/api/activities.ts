import {
  GetActivitiesResponse,
  GetActivityDetailResponse,
  GetActivityReviewsResponse,
  GetAvailableScheduleResponse,
  PostActivitiesImageResponse,
  PostActivitiesRequest,
  PostActivitiesResponse,
  PostReservationsRequest,
  PostReservationsResponse,
} from '@trip.zip-api';

import axiosInstance from '../axiosInstance';

// 체험 리스트 조회
export async function getActivities({
  method = 'offset',
  cursorId,
  category,
  keyword,
  sort = 'latest',
  page = 1,
  size = 20,
}: {
  method?: 'offset' | 'cursor';
  cursorId?: number;
  category?: string;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  page?: number;
  size?: number;
} = {}): Promise<GetActivitiesResponse> {
  try {
    const params = new URLSearchParams({
      method,
      sort,
      page: page.toString(),
      size: size.toString(),
    });

    // cursorId, category, keyword가 undefined가 아닐 때만 추가
    if (cursorId !== undefined) {
      params.append('cursorId', cursorId.toString());
    }
    if (category) {
      params.append('category', category);
    }
    if (keyword) {
      params.append('keyword', keyword);
    }

    const response = await axiosInstance.get<GetActivitiesResponse>(
      `/activities`,
      {
        params,
      },
    );

    return response.data;
  } catch (error) {
    console.error('getActivities 함수에서 오류 발생:', error);
    throw error;
  }
}

// 체험 등록
export async function postActivities(
  data: PostActivitiesRequest,
): Promise<PostActivitiesResponse> {
  try {
    const response = await axiosInstance.post<PostActivitiesResponse>(
      `/activities`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('postActivities 함수에서 오류 발생:', error);
    throw error;
  }
}

// 체험 상세 조회
export async function getActivityDetail(
  activityId: number,
): Promise<GetActivityDetailResponse> {
  try {
    const response = await axiosInstance.get<GetActivityDetailResponse>(
      `/activities/${activityId}`,
    );
    return response.data;
  } catch (error) {
    console.error('getActivityDetail 함수에서 오류 발생:', error);
    throw error;
  }
}

// 체험 예약 가능일
export async function getAvailableSchedule(
  activityId: number,
  year: string,
  month: string,
): Promise<GetAvailableScheduleResponse> {
  try {
    const params = new URLSearchParams({
      year,
      month,
    });

    const response = await axiosInstance.get<GetAvailableScheduleResponse>(
      `/activities/${activityId}/available-schedule`,
      {
        params,
      },
    );

    return response.data;
  } catch (error) {
    console.error('getAvailableSchedule 함수에서 오류 발생:', error);
    throw error;
  }
}

// 체험 리뷰 조회
export async function getActivityReviews(
  activityId: number,
  page: number,
  size: number,
): Promise<GetActivityReviewsResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await axiosInstance.get<GetActivityReviewsResponse>(
      `/activities/${activityId}/reviews`,
      {
        params,
      },
    );

    return response.data;
  } catch (error) {
    console.error('getActivityReviews 함수에서 오류 발생:', error);
    throw error;
  }
}

// 체험 예약 신청
export async function postReservations({
  activityId,
  data,
}: {
  activityId: number;
  data: PostReservationsRequest;
}): Promise<PostReservationsResponse> {
  try {
    const response = await axiosInstance.post<PostReservationsResponse>(
      `/activities/${activityId}/reservations`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('postReservations 함수에서 오류 발생:', error);
    throw error;
  }
}

// 체험 이미지 url 생성
export async function postActivityImage(
  imageFile: File,
): Promise<PostActivitiesImageResponse> {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axiosInstance.post<PostActivitiesImageResponse>(
      `/activities/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('postActivityImage 함수에서 오류 발생:', error);
    throw error;
  }
}
