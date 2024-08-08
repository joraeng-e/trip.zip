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
        <p className="mb-2 text-gray-600">{status}</p>
        <h2 className="text-xl mb-2 text-lg-semibold">{title}</h2>
        <p className="text-gray-600">
          {date} {startTime} - {endTime} {headCount}명
        </p>
        <div className="flex items-baseline justify-between pb-10 pr-10 md:pr-20">
          <p className="mb-2 text-md-semibold md:text-xl-semibold">
            ₩{totalPrice.toLocaleString()}원
          </p>
          <Button className="max-w-100 rounded-md">예약 취소</Button>
        </div>
      </div>
    </div>
  );
}
