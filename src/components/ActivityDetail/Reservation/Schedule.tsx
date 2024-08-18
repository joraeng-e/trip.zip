import Button from '@/components/commons/Button';
import { notify } from '@/components/commons/Toast';
import { postReservations } from '@/libs/api/activities';
import { getUser } from '@/libs/api/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  GetActivityDetailResponse,
  GetAvailableScheduleResponse,
  PostReservationsRequest,
} from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

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
  onReservationComplete?: () => void; // 예약 완료 핸들러 추가
  detailData: GetActivityDetailResponse;
  selectedDate: Date;
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

  const { bannerImageUrl, title, address, rating, price } = detailData;

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    staleTime: 0,
  });

  const router = useRouter();
  const { activityid } = router.query;
  const activityId = Number(activityid);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

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
      if (onReservationComplete) {
        onReservationComplete();
      }
      notify('success', '예약이 성공적으로 완료되었습니다.');
    },
    onError: (error: Error) => {
      setIsModalOpen(false);
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
          <div className="flex">
            {/* 왼쪽: 배너 이미지 */}
            <div className="mr-4">
              <Image
                src={bannerImageUrl}
                alt={title}
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>

            {/* 오른쪽: 제목, 주소, 평점, 가격 */}
            <div className="flex-1">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-md text-gray-600">{address}</p>
              <div className="flex items-center">
                <FaStar className="mt-1 text-yellow-500" />
                <span className="ml-1">{rating}</span>
              </div>
              <p className="text-lg font-semibold">가격: {price} 원</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-bold">예약 내용</h4>
            <div>예약자: {userInfo?.nickname}</div>
            <div>이메일: {userInfo?.email}</div>
            <div>인원 수: {guestCount}</div>
            <div>
              예약일시: {moment(selectedDate).format('YYYY년 MM월 DD일')} /{' '}
              {selectedSchedules
                .map(
                  (schedule) => `${schedule.startTime} ~ ${schedule.endTime}`,
                )
                .join(', ')}
            </div>
            <div>총 상품 금액: {guestCount * price} 원</div>
          </div>

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
