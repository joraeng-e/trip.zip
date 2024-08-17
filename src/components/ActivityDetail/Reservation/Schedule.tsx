import Button from '@/components/commons/Button';
import { GetAvailableScheduleResponse } from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import router from 'next/router';
import { useEffect, useState } from 'react';

interface ScheduleProps {
  selectedSchedules: { startTime: string; endTime: string; id: number }[];
  activeIndex: number | null;
  isSameUser: boolean;
  bookableSchedule: GetAvailableScheduleResponse;
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
  } = props;

  const [loggedIn, setLoggedIn] = useState(false);

  const bookableIds = new Set<number>();
  bookableSchedule.forEach((schedule) => {
    schedule.times.forEach((time) => {
      bookableIds.add(time.id);
    });
  });

  const checkLoginState = () => {
    // 쿠키에서 accessToken을 확인해 로그인 상태 결정
    const accessToken = getCookie('accessToken');
    setLoggedIn(!!accessToken);
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
        onClick={() => {
          if (!loggedIn) {
            router.push('/login');
          } else if (isSameUser) {
            router.push('/mypage/myActivities');
          } else {
            alert('예약하기 버튼 클릭됨!');
          }
        }}
      >
        {isSameUser ? '체험 수정하기' : '예약하기'}
      </Button>
    </>
  );
}
