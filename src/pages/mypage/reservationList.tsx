import Dropdown from '@/components/commons/Dropdown';
import DotLoading from '@/components/commons/Loading/DotLoading';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import NoActivity from '@/components/mypage/NoActivity';
import ReservationCard from '@/components/mypage/ReservationList/ReservationCard';
import ReviewModal from '@/components/mypage/ReservationList/ReviewModal/ReviewModal';
import { getMyReservations } from '@/libs/api/myReservations';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetMyReservationsResponse,
  Reservation,
  ReservationStatus,
} from '@trip.zip-api';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const CARD_PER_PAGE = 5;

export default function ReservationList() {
  const [value, setValue] = useState<string>('');

  const [reviewReservation, setReviewReservation] = useState<Reservation>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const lastCardRef = useRef<HTMLDivElement | null>(null);

  // 필터가 없을 경우 전체를 조회하도록 status 설정
  const status: ReservationStatus | undefined =
    value === '' ? undefined : (value as ReservationStatus);

  // useInfiniteQuery를 사용해 페이지 단위로 예약 데이터 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GetMyReservationsResponse>({
      queryKey: ['reservations', value],
      queryFn: ({ pageParam = undefined }) =>
        getMyReservations({
          cursorId: pageParam !== undefined ? Number(pageParam) : undefined,
          size: CARD_PER_PAGE,
          status: status,
        }),
      getNextPageParam: (lastPage) => lastPage.cursorId,
      initialPageParam: undefined,
    });

  // 모든 예약을 최신순으로 정렬
  const sortedReservations = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => page.reservations)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data]);

  // IntersectionObserver를 사용해 마지막 카드가 화면에 보일 때 다음 페이지 로드
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentLastCard = lastCardRef.current;
    if (currentLastCard) {
      observer.observe(currentLastCard);
    }

    return () => {
      if (currentLastCard) {
        observer.unobserve(currentLastCard);
      }
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleClickReview = (reservation: Reservation) => {
    setReviewReservation(reservation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MyPageLayout>
      <div className="mb-100 h-fit">
        <div className="mb-24 flex w-full items-center justify-between">
          <h1 className="text-3xl-bold">예약 내역</h1>
          <Dropdown selected={value} setSelected={setValue}>
            <Dropdown.Button className="flex items-center justify-center rounded-xl border-2 border-custom-green-200 px-10 py-5 text-center">
              {value === '' && '전체 보기'}
              {value === 'pending' && '예약 신청'}
              {value === 'canceled' && '예약 취소'}
              {value === 'confirmed' && '예약 승인'}
              {value === 'declined' && '예약 거절'}
              {value === 'completed' && '체험 완료'}
            </Dropdown.Button>
            <Dropdown.Body>
              <Dropdown.Item value="">전체 보기</Dropdown.Item>
              <Dropdown.Item value="pending">예약 신청</Dropdown.Item>
              <Dropdown.Item value="canceled">예약 취소</Dropdown.Item>
              <Dropdown.Item value="confirmed">예약 승인</Dropdown.Item>
              <Dropdown.Item value="declined">예약 거절</Dropdown.Item>
              <Dropdown.Item value="completed">체험 완료</Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        </div>
        <p className="mb-10 text-sm-medium text-custom-green-200 dark:text-custom-green-100">
          *예약 날짜가 지나면 자동으로 예약 취소가 됩니다.
        </p>

        {sortedReservations.length === 0 ? (
          <NoActivity />
        ) : (
          <>
            {sortedReservations.map((reservation, index) => (
              <div
                ref={
                  index === sortedReservations.length - 1 ? lastCardRef : null
                }
                key={reservation.id}
              >
                <ReservationCard
                  reservation={reservation}
                  onReviewClick={handleClickReview}
                />
              </div>
            ))}
            {isFetchingNextPage && <DotLoading />}
          </>
        )}
        {isModalOpen && reviewReservation && (
          <ReviewModal
            isOpen={isModalOpen}
            onClose={closeModal}
            reservation={reviewReservation}
          />
        )}
      </div>
    </MyPageLayout>
  );
}
