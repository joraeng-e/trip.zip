import Dropdown from '@/components/commons/Dropdown';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import NoActivity from '@/components/mypage/NoActivity';
import ReservationCard from '@/components/mypage/ReservationList/ReservationCard';
import { getMyReservations } from '@/libs/api/myReservations';
import { useQuery } from '@tanstack/react-query';
import { ReservationStatus } from '@trip.zip-api';
import { GetMyReservationsResponse } from '@trip.zip-api';
import React, { useState } from 'react';

export default function ReservationList() {
  const [value, setValue] = useState<ReservationStatus>('pending');

  const { data: reservationData } = useQuery<GetMyReservationsResponse>({
    queryKey: ['reservations', value],
    queryFn: () =>
      getMyReservations({
        size: 20,
        status: value,
      }),
  });

  // reservations가 GetMyReservationsResponse의 프로퍼티로 가정
  const reservations = reservationData?.reservations || []; // 기본값 설정

  return (
    <MyPageLayout>
      <div className="mb-100 h-fit">
        <div className="mb-30 flex w-full items-center justify-between">
          <h1 className="text-3xl-bold">예약 내역</h1>
          <Dropdown
            selected={value}
            setSelected={
              setValue as React.Dispatch<React.SetStateAction<string>>
            }
            width={100}
            maxWidth={160}
            height={50}
            defaultValue="필터"
          >
            <Dropdown.Button className="w-100 rounded-xl border-2 border-custom-green-200 py-10 md:w-160">
              필터
            </Dropdown.Button>
            <Dropdown.Body>
              <Dropdown.Item value="pending">예약 신청</Dropdown.Item>
              <Dropdown.Item value="canceled">예약 취소</Dropdown.Item>
              <Dropdown.Item value="confirmed">예약 승인</Dropdown.Item>
              <Dropdown.Item value="declined">예약 거절</Dropdown.Item>
              <Dropdown.Item value="completed">체험 완료</Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        </div>
        {!reservations.length ? (
          <NoActivity />
        ) : (
          reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))
        )}
      </div>
    </MyPageLayout>
  );
}
