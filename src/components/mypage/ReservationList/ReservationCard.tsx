import Button from '@/components/commons/Button';
import { Reservation } from '@trip.zip-api';
import Image from 'next/image';
import React from 'react';

type ReservationCardProps = {
  reservation: Reservation;
};

export default function ReservationCard({ reservation }: ReservationCardProps) {
  const {
    activity: { bannerImageUrl, title },
    date,
    startTime,
    endTime,
    status,
    totalPrice,
    headCount,
  } = reservation;

  const statusValue = (status: string) => {
    switch (status) {
      case 'pending':
        return <p className="font-bold text-custom-blue-200">예약 완료</p>;
      case 'canceled':
        return <p className="font-bold text-custom-gray-700">예약 취소</p>;
      case 'confirmed':
        return <p className="font-bold text-custom-orange-200">예약 승인</p>;
      case 'declined':
        return <p className="font-bold text-custom-red-200">예약 거절</p>;
      case 'completed':
        return <p className="font-bold text-custom-green-300">체험 완료</p>;
    }
  };

  const statusButton = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Button variant="inactiveButton" className="max-w-100 rounded-md">
            예약 취소
          </Button>
        );
      case 'completed':
        return <Button className="max-w-100 rounded-md">후기 작성</Button>;
      default:
        return;
    }
  };

  return (
    <div className="mb-16 flex h-153 max-w-800 gap-20 overflow-hidden rounded-xl shadow-md lg:h-204">
      <div className="relative h-full w-128 flex-shrink-0 md:w-156 lg:w-204">
        <Image
          src={bannerImageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between py-10">
        <p className="mb-2 text-gray-600">{statusValue(status)}</p>
        <h2 className="text-xl mb-2 text-lg-semibold">{title}</h2>
        <p className="text-gray-600">
          {date} {startTime} - {endTime} {headCount}명
        </p>
        <div className="flex items-baseline justify-between pb-10 pr-10 md:pr-20">
          <p className="mb-2 text-md-semibold md:text-xl-semibold">
            ₩{totalPrice.toLocaleString()}
          </p>
          {statusButton(status)}
        </div>
      </div>
    </div>
  );
}
