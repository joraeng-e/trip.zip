import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';
import { notify } from '@/components/commons/Toast';
import { postReservations } from '@/libs/api/activities';
import { getUser } from '@/libs/api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetActivityDetailResponse,
  GetAvailableScheduleResponse,
  PostReservationsRequest,
} from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import ReservationModal from './ReservationConfirmation';
import ReservationConfirmation from './ReservationConfirmation/ReservationCard';

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
    onSuccess: () => {
      if (onReservationComplete) {
        onReservationComplete();
        queryClient.invalidateQueries({ queryKey: ['reservations'] });
      }
      notify('success', '예약이 성공적으로 완료되었습니다.');
    },
    onError: (error: Error) => {
      if (onReservationComplete) {
        onReservationComplete();
      }
      notify('error', error.message);
      console.log(error);
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
          <div className="my-16 grid grid-cols-2 gap-10">
            {selectedSchedules.map((schedule, index) => {
              const isBookable = bookableIds.has(schedule.id);
              const isSelected = selectedScheduleId === schedule.id;
              return (
                <button
                  key={index}
                  className={`min-x-100 max-x-140 h-40 w-full rounded-md border text-md-regular hover:bg-custom-gray-300 dark:bg-custom-black dark:text-white ${
                    isSelected
                      ? 'bg-custom-active tran bg-custom-green-200 text-white hover:bg-custom-green-200 dark:bg-white dark:text-custom-black'
                      : isBookable
                        ? 'text-custom-black'
                        : 'cursor-not-allowed bg-custom-gray-200 text-custom-gray-700 line-through hover:bg-custom-gray-200 dark:border-custom-gray-800 dark:bg-custom-gray-800 dark:text-custom-gray-500'
                  }`}
                  onClick={() => {
                    if (isBookable) {
                      if (isSelected) {
                        setSelectedScheduleId(null);
                      } else {
                        handleScheduleClick(index, schedule);
                        setSelectedScheduleId(schedule.id);
                      }
                    }
                  }}
                  disabled={!isBookable}
                >
                  {schedule.startTime} ~ {schedule.endTime}
                </button>
              );
            })}
          </div>

          <Button
            variant="activeButton"
            className={`mt-4 h-36 rounded-md text-md-bold`}
            onClick={() => {
              if (!getCookie('refreshToken')) {
                router.push('/login');
              } else if (isSameUser) {
                router.push('/mypage/myActivities');
              }
            }}
          >
            {getCookie('refreshToken') ? '체험 수정하기' : '로그인하기'}
          </Button>
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
        />
      )}
    </>
  );
}
