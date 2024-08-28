import Button from '@/components/commons/Button';
import { notify } from '@/components/commons/Toast';
import { postReservations } from '@/libs/api/activities';
import { sendSubscriptionToServer } from '@/libs/api/myNotifications';
import { getUser } from '@/libs/api/user';
import { requestForToken } from '@/libs/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetActivityDetailResponse,
  GetAvailableScheduleResponse,
  PostReservationsRequest,
} from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ReservationModal from '../ReservationConfirmation';
import ScheduleList from './ScheduleList';

interface ScheduleProps {
  selectedSchedules: { startTime: string; endTime: string; id: number }[];
  activeIndex: number | null;
  isSameUser: boolean;
  bookableSchedule: GetAvailableScheduleResponse;
  guestCount: number;
  handleScheduleClick: (
    index: number,
    schedule: { startTime: string; endTime: string; id: number },
  ) => void;
  onReservationComplete?: () => void;
  detailData: GetActivityDetailResponse;
  selectedDate: Date | null;
}

export default function Schedule(props: ScheduleProps) {
  const {
    selectedSchedules,
    activeIndex,
    isSameUser,
    handleScheduleClick,
    bookableSchedule,
    guestCount,
    onReservationComplete,
    detailData,
    selectedDate,
  } = props;

  const router = useRouter();
  const { activityid } = router.query;
  const activityId = Number(activityid);

  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    staleTime: 0,
    enabled: !!getCookie('refreshToken'),
  });

  const bookableIds = new Set<number>();
  bookableSchedule.forEach((schedule) => {
    schedule.times.forEach((time) => {
      bookableIds.add(time.id);
    });
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postReservations,
    onSuccess: async (data) => {
      if (onReservationComplete) {
        onReservationComplete();
        queryClient.invalidateQueries({ queryKey: ['reservations'] });
      }
      notify('success', '예약이 성공적으로 완료되었습니다.');

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await requestForToken();
        await sendSubscriptionToServer({ id: data.id, token: token as string });
      }
    },
    onError: (error: Error) => {
      if (onReservationComplete) {
        onReservationComplete();
      }
      notify('error', error.message);
    },
  });

  const handleSubmitReservation = () => {
    if (selectedScheduleId !== null) {
      const data: PostReservationsRequest = {
        scheduleId: selectedScheduleId,
        headCount: guestCount,
      };
      mutation.mutate({ activityId, data });
    }
  };

  const isFullyBooked =
    selectedSchedules.length === 0 ||
    !selectedSchedules.some((schedule) => bookableIds.has(schedule.id));

  return (
    <>
      <hr className="contour mx-0" />
      <div className="dark-base text-lg-bold text-nomad-black">
        예약 가능 시간
      </div>

      {selectedSchedules.length === 0 ||
      !selectedSchedules.some((schedule) => bookableIds.has(schedule.id)) ? (
        <div className="mt-4 text-red-500">예약이 마감되었습니다.</div>
      ) : (
        <>
          <ScheduleList
            selectedSchedules={selectedSchedules}
            bookableIds={bookableIds}
            selectedScheduleId={selectedScheduleId}
            handleScheduleClick={handleScheduleClick}
            setSelectedScheduleId={setSelectedScheduleId}
          />
          {getCookie('refreshToken') && isSameUser ? (
            <Button
              variant="activeButton"
              className={`mt-4 h-36 rounded-md text-md-bold`}
              onClick={() => router.push('/mypage/myActivities')}
            >
              체험 수정하기
            </Button>
          ) : !getCookie('refreshToken') ? (
            <Button
              variant="activeButton"
              className={`mt-4 h-36 rounded-md text-md-bold`}
              onClick={() => router.push('/login')}
            >
              로그인하기
            </Button>
          ) : null}
        </>
      )}
      {userData && (
        <ReservationModal
          selectedScheduleId={selectedScheduleId}
          detailData={detailData}
          userData={userData}
          guestCount={guestCount}
          selectedDate={selectedDate}
          isSameUser={isSameUser}
          activeIndex={activeIndex}
          selectedSchedules={selectedSchedules}
          handleSubmitReservation={handleSubmitReservation}
          isFullyBooked={isFullyBooked}
        />
      )}
    </>
  );
}
