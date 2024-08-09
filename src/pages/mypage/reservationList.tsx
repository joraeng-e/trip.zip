import Dropdown from '@/components/commons/Dropdown';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import NoActivity from '@/components/mypage/NoActivity';
import ReservationCard from '@/components/mypage/ReservationList/ReservationCard';
import { getMyReservations } from '@/libs/api/myReservations';
import { useQuery } from '@tanstack/react-query';
import { GetMyReservationsResponse, ReservationStatus } from '@trip.zip-api';
import React, { useState } from 'react';

export default function ReservationList() {
  const [value, setValue] = useState<string>('');

  // 필터가 없을 경우 전체를 조회하도록 status 설정
  const status: ReservationStatus | undefined =
    value === '' ? undefined : (value as ReservationStatus);

  const { data: reservationData } = useQuery<GetMyReservationsResponse>({
    queryKey: ['reservations', value],
    queryFn: () =>
      getMyReservations({
        size: 20,
        status: status,
      }),
  });

  // 데이터가 undefined일 경우, 빈 배열([])을 기본값으로 설정
  const reservations = reservationData?.reservations || [];

  const sortedReservations = reservations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <MyPageLayout>
      <div className="mb-100 h-fit">
        <div className="mb-30 flex w-full items-center justify-between">
          <h1 className="text-3xl-bold">예약 내역</h1>
          <Dropdown
            selected={value}
            setSelected={setValue}
            width={100}
            maxWidth={160}
            height={50}
          >
            <Dropdown.Button className="w-100 rounded-xl border-2 border-custom-green-200 py-10 md:w-160">
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
        {!sortedReservations.length ? (
          <NoActivity />
        ) : (
          sortedReservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))
        )}
      </div>
    </MyPageLayout>
  );
}
