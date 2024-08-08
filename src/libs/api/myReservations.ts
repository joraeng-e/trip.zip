import { GetMyReservationsResponse, PatchMyReservationResponse, PostReviewRequest, PostReviewResponse, ReservationStatus } from '@trip.zip-api';



import axiosInstance from '../axiosInstance';


// 내 예약 리스트 조회
export async function getMyReservations({
  cursorId,
  size = 10,
  status,
}: {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}): Promise<GetMyReservationsResponse> {
  try {
    const params = new URLSearchParams();
    if (cursorId !== undefined) {
      params.append('cursorId', cursorId.toString());
    }
    params.append('size', size.toString());
    if (status) {
      params.append('status', status);
    }

    const response = await axiosInstance.get<GetMyReservationsResponse>(
      `/my-reservations`,
      { params },
    );

    return response.data;
  } catch (error) {
    console.error('getMyReservations 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 예약 수정 (취소)
export async function patchMyReservationStatus(
  reservationId: number,
  status: 'canceled',
): Promise<PatchMyReservationResponse> {
  try {
    // PATCH 요청
    const response = await axiosInstance.patch<PatchMyReservationResponse>(
      `/my-reservations/${reservationId}`,
      { status },
    );

    return response.data;
  } catch (error) {
    console.error('patchMyReservationStatus 함수에서 오류 발생:', error);
    throw error;
  }
}

// 내 예약 리뷰 작성
export async function postReview({
  reservationId,
  review,
}: {
  reservationId: number;
  review: PostReviewRequest;
}): Promise<PostReviewResponse> {
  try {
    const response = await axiosInstance.post<PostReviewResponse>(
      `/my-reservations/${reservationId}/reviews`,
      review,
    );

    return response.data;
  } catch (error) {
    console.error('postReview 함수에서 오류 발생:', error);
    throw error;
  }
}