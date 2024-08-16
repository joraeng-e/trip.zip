import {
  GetMyActivitiesReservationDashboardResponse,
  GetMyActivitiesReservationsResponse,
  GetMyActivitiesReservedScheduleResponse,
  GetMyActivitiesResponse,
  PatchMyActivitiesReservationResponse,
  PatchMyActivityRequest,
  PatchMyActivityResponse,
} from '@trip.zip-api';

import axiosInstance from '../axiosInstance';

// 내 체험 리스트 조회
export async function getMyActivities({
  cursorId,
  size = 20,
}: {
  cursorId?: number;
  size?: number;
}): Promise<GetMyActivitiesResponse> {
  try {
    const params = new URLSearchParams({
      size: size.toString(),
    });

    if (cursorId !== undefined) {
      params.append('cursorId', cursorId.toString());
    }

    const response = await axiosInstance.get<GetMyActivitiesResponse>(
      `/my-activities`,
      {
        params,
      },
    );

    return response.data;
  } catch (error) {
    console.error('getMyActivities 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 체험 리스트 전체 조회
export async function getMyAllActivities(): Promise<GetMyActivitiesResponse> {
  try {
    const response =
      await axiosInstance.get<GetMyActivitiesResponse>('/my-activities');
    return response.data;
  } catch (error) {
    console.error('getMyActivities 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 체험 월별 예약 현황 조회
export async function getMyActivitiesReservationDashboard({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}): Promise<GetMyActivitiesReservationDashboardResponse> {
  try {
    const params = new URLSearchParams({
      year,
      month,
    });

    const response =
      await axiosInstance.get<GetMyActivitiesReservationDashboardResponse>(
        `/my-activities/${activityId}/reservation-dashboard`,
        {
          params,
        },
      );

    return response.data;
  } catch (error) {
    console.error(
      'getMyActivitiesReservationDashboard 함수에서 오류 발생:',
      error,
    );
    throw error;
  }
}

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
export async function getMyActivitiesReservedSchedule({
  activityId,
  date,
}: {
  activityId: number;
  date: string;
}): Promise<GetMyActivitiesReservedScheduleResponse> {
  try {
    const params = new URLSearchParams({
      date,
    });

    const response =
      await axiosInstance.get<GetMyActivitiesReservedScheduleResponse>(
        `/my-activities/${activityId}/reserved-schedule`,
        {
          params,
        },
      );

    return response.data;
  } catch (error) {
    console.error('getMyActivitiesReservedSchedule 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 체험 예약 시간대별 예약 내역 조회
export async function getMyActivitiesReservations({
  activityId,
  cursorId,
  size = 10,
  scheduleId,
  status,
}: {
  activityId: number;
  cursorId?: number;
  size?: number;
  scheduleId?: number;
  status?: 'declined' | 'pending' | 'confirmed';
}): Promise<GetMyActivitiesReservationsResponse> {
  try {
    const params = new URLSearchParams({
      size: size.toString(),
    });

    if (cursorId !== undefined) {
      params.append('cursorId', cursorId.toString());
    }
    if (scheduleId) {
      params.append('scheduleId', scheduleId.toString());
    }
    if (status) {
      params.append('status', status);
    }

    const response =
      await axiosInstance.get<GetMyActivitiesReservationsResponse>(
        `/my-activities/${activityId}/reservations`,
        { params },
      );

    return response.data;
  } catch (error) {
    console.error('getMyActivitiesReservations 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 체험 예약 상태(승인, 거절) 업데이트
export async function patchMyActivitiesReservation({
  activityId,
  reservationId,
  status,
}: {
  activityId: number;
  reservationId: number;
  status: 'declined' | 'confirmed';
}): Promise<PatchMyActivitiesReservationResponse> {
  try {
    const response =
      await axiosInstance.patch<PatchMyActivitiesReservationResponse>(
        `/my-activities/${activityId}/reservations/${reservationId}`,
        {
          status,
        },
      );

    return response.data;
  } catch (error) {
    console.error('patchMyActivitiesReservation 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 체험 삭제
export async function deleteMyActivity(activityId: number) {
  try {
    await axiosInstance.delete(`/my-activities/${activityId}`);
  } catch (error) {
    console.error('deleteMyActivity 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 체험 수정
export async function patchMyActivity({
  activityId,
  data,
}: {
  activityId: number;
  data: PatchMyActivityRequest;
}): Promise<PatchMyActivityResponse> {
  try {
    const response = await axiosInstance.patch<PatchMyActivityResponse>(
      `/my-activities/${activityId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('patchMyActivity 함수에서 오류 발생:', error);
    throw error;
  }
}
