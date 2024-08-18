import Button from '@/components/commons/Button';
import Toast, { notify } from '@/components/commons/Toast';
import { postReservations } from '@/libs/api/activities';
import { useMutation } from '@tanstack/react-query';
import {
  GetAvailableScheduleResponse,
  PostReservationsRequest,
} from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BaseModal from '../BaseModal';

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
}

export default function Schedule(props: ScheduleProps) {
  const {
    selectedSchedules,
    activeIndex,
    isSameUser,
    handleScheduleClick,
    bookableSchedule,
    guestCount,
  } = props;

  const router = useRouter();
  const { activityid } = router.query;
  const activityId = Number(activityid);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  ); // 선택한 스케줄 ID

  const bookableIds = new Set<number>();
  bookableSchedule.forEach((schedule) => {
    schedule.times.forEach((time) => {
      bookableIds.add(time.id);
    });
  });

  const checkLoginState = () => {
    const accessToken = getCookie('accessToken');
    setLoggedIn(!!accessToken);
  };

  const handleReservationClick = () => {
    if (!loggedIn) {
      router.push('/login');
    } else if (isSameUser) {
      router.push('/mypage/myActivities');
    } else {
      setIsModalOpen(true);
    }
  };

  const mutation = useMutation({
    mutationFn: postReservations,
    onSuccess: () => {
      setIsModalOpen(false);
      notify('success', '예약이 성공적으로 완료되었습니다.');
    },
    onError: (error: Error) => {
      setIsModalOpen(false);
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

  useEffect(() => {
    checkLoginState();
  }, []);

  return (
    <>
      <hr className="contour mx-0" />
      <div className="text-lg-bold text-nomad-black">예약 가능 시간</div>
      <div className="my-16 grid grid-cols-2 gap-10">
        {selectedSchedules.map((schedule, index) => {
          const isBookable = bookableIds.has(schedule.id);

          return (
            <button
              key={index}
              className={`min-x-100 max-x-140 h-40 w-full rounded-md border text-md-regular hover:bg-custom-gray-300 ${
                activeIndex === index
                  ? 'bg-custom-active tran bg-custom-green-200 text-white hover:bg-custom-green-200'
                  : isBookable
                    ? 'text-custom-black'
                    : 'cursor-not-allowed bg-custom-gray-200 text-custom-gray-700 line-through hover:bg-custom-gray-200'
              }`}
              onClick={() => {
                if (isBookable) {
                  handleScheduleClick(index, schedule);
                  setSelectedScheduleId(schedule.id); // 선택한 스케줄 ID 저장
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
        className="mt-4 h-36 rounded-md text-md-bold"
        onClick={handleReservationClick} // 클릭 핸들러 변경
      >
        {isSameUser ? '체험 수정하기' : '예약하기'}
      </Button>

      {/* 모달 컴포넌트 추가 */}
      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-bold">예약 확인</h2>

          <div>손님 수: {guestCount}</div>
          <div>활동 ID: {activityId}</div>
          <div>선택한 스케줄 ID:</div>
          <ul>
            {selectedSchedules.map((schedule) => (
              <li key={schedule.id}>{schedule.id}</li>
            ))}
          </ul>
          <Button
            variant="activeButton"
            className="mt-4"
            onClick={handleSubmitReservation}
          >
            확인
          </Button>
        </div>
      </BaseModal>
    </>
  );
}
