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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      notify('warning', '로그인이 필요한 서비스입니다.', () => {
        router.push('/login');
      });
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
                  className={`min-x-100 max-x-140 h-40 w-full rounded-md border text-md-regular hover:bg-custom-gray-300 ${
                    isSelected
                      ? 'bg-custom-active tran bg-custom-green-200 text-white hover:bg-custom-green-200'
                      : isBookable
                        ? 'text-custom-black'
                        : 'cursor-not-allowed bg-custom-gray-200 text-custom-gray-700 line-through hover:bg-custom-gray-200'
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
            className="mt-4 h-36 rounded-md text-md-bold"
            onClick={() => {
              if (isSameUser) {
                handleReservationClick();
              } else {
                if (selectedScheduleId === null) {
                  notify('warning', '스케줄을 선택해 주세요.');
                } else {
                  handleReservationClick();
                }
              }
            }}
          >
            {isSameUser ? '체험 수정하기' : '예약하기'}
          </Button>
        </>
      )}

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="mx-40 h-auto p-20 text-nomad-black"
      >
        <div className="w-800">
          <h2 className="ml-10 text-2xl-bold">예약 확인</h2>

          <div className="mt-4 rounded-lg bg-white p-4 shadow-lg">
            <div className="flex">
              <div className="relative mr-4 h-200 w-200">
                <Image src={bannerImageUrl} alt={title} fill />
              </div>

              <div className="relative mx-20 my-10 flex-1">
                <h3 className="text-xl-bold">{title}</h3>
                <p className="mt-6 text-md-semibold text-custom-gray-700">
                  {address}
                </p>
                <div className="mt-10 flex items-center">
                  <FaStar className="mb-0 text-yellow-500" />
                  <span className="ml-4 text-md-regular">{rating}</span>
                </div>
                <p className="absolute bottom-0 right-0 text-2xl-semibold">
                  {price} 원
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="my-20 rounded-lg py-20 shadow-lg">
              <h4 className="ml-20 text-xl-bold">예약자 정보</h4>
              <div className="my-10 ml-20">
                <div className="mb-4 text-lg-medium">
                  예약자: {userInfo?.nickname}
                </div>
                <div className="text-lg-medium">이메일: {userInfo?.email}</div>
              </div>
            </div>

            <div className="my-20 rounded-lg py-20 shadow-lg">
              <h4 className="ml-20 text-xl-bold">예약 내용</h4>
              <div className="mt-2 flex justify-between">
                <div className="my-10 ml-20">
                  <div className="mb-4 text-lg-medium">
                    인원 수: {guestCount}
                  </div>
                  <div className="text-lg-medium">
                    예약일시: {moment(selectedDate).format('YYYY년 MM월 DD일')}{' '}
                    /{'  '}
                    {selectedSchedules
                      .map(
                        (schedule) =>
                          `${schedule.startTime} ~ ${schedule.endTime}`,
                      )
                      .join(', ')}
                  </div>
                </div>
              </div>
              <hr className="contour" />
              <div className="mx-20 mt-10 flex justify-between text-xl-bold">
                총 상품 금액
                <div className="text-custom-green-300">
                  {guestCount * price} 원
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="activeButton"
            className="mt-4"
            onClick={handleSubmitReservation}
            hasICon
          >
            예약하기
          </Button>
        </div>
      </BaseModal>
    </>
  );
}
