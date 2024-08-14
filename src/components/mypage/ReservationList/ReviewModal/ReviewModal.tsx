import Button from '@/components/commons/Button';
import useClickOutside from '@/hooks/useClickOutside';
import { XIcon } from '@/libs/utils/Icon';
import { formatNumber } from '@/libs/utils/formatNumber';
import { Reservation } from '@trip.zip-api';
import React, { useRef, useState } from 'react';

import Rating from './Rating';

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
};

export default function ReviewModal({
  isOpen,
  onClose,
  reservation,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const handleChangeRating = (rating: number) => {
    setRating(rating);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const reviewData = {
      rating: rating,
      content: content,
    };

    console.log(reviewData);
  };

  return (
    isOpen && (
      <div className="flex-center fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm">
        <div
          ref={modalRef}
          className="flex h-full w-full flex-col gap-35 overflow-y-auto border-custom-gray-300 bg-white px-24 py-35 pb-30 shadow-lg md:rounded-lg md:border-1 lg:h-697 lg:w-429"
        >
          <div className="flex items-center justify-between">
            <span className="text-28 font-bold text-custom-black">
              후기작성
            </span>
            <button type="button" onClick={onClose}>
              <XIcon className="size-48" />
            </button>
          </div>
          <form className="flex h-full flex-col gap-12" onSubmit={handleSubmit}>
            <div className="flex gap-8">
              <div className="size-100 overflow-hidden rounded-xl bg-custom-gray-300">
                <img
                  className="h-full w-full object-cover"
                  src={reservation.activity.bannerImageUrl}
                  alt="액티비티이미지"
                />
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-16 font-bold text-nomad-black">
                  {reservation.activity.title}
                </span>
                <span className="text-14 font-normal text-nomad-black">
                  {reservation.date} / {reservation.startTime}-
                  {reservation.endTime} / {reservation.headCount}명
                </span>
                <hr />
                <span className="text-20 font-bold text-nomad-black">
                  ₩ {formatNumber(reservation.totalPrice)}
                </span>
              </div>
            </div>
            <div className="flex-center h-100 w-full">
              <Rating starSize={50} onClick={handleChangeRating} />
            </div>
            <div className="relative h-full w-full">
              <textarea
                className="relative h-full w-full flex-1 resize-none overflow-y-auto border-1 border-custom-gray-700 p-10 pb-20"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <span className="absolute bottom-10 right-10">
                {content.length}
              </span>
            </div>
            <Button
              className="mt-12 h-54"
              type="submit"
              variant="activeButton"
              hasICon
            >
              작성하기
            </Button>
          </form>
        </div>
      </div>
    )
  );
}
