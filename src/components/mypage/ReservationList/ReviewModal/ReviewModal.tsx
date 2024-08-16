import Button from '@/components/commons/Button';
import { notify } from '@/components/commons/Toast';
import useClickOutside from '@/hooks/useClickOutside';
import { postReview } from '@/libs/api/myReservations';
import { XIcon } from '@/libs/utils/Icon';
import { formatNumber } from '@/libs/utils/formatNumber';
import { Reservation } from '@trip.zip-api';
import { isAxiosError } from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rating <= 0) {
      notify('error', '별점을 선택해주세요');
      return;
    }
    const reviewData = {
      rating: rating,
      content: content,
    };
    try {
      const response = await postReview({
        reservationId: reservation.id,
        review: reviewData,
      });
      notify('success', '리뷰가 등록되었습니다.');
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || '알 수 없는 오류 발생';
        notify('error', errorMessage);
      } else {
        notify('error', '알 수 없는 오류 발생');
      }
    } finally {
      onClose();
    }
  };

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-center fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm"
      >
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
              <div className="relative size-100 overflow-hidden rounded-xl border-none bg-custom-gray-300 md:size-120">
                <Image
                  className="object-cover"
                  src={reservation.activity.bannerImageUrl}
                  alt="액티비티이미지"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-16 font-bold text-nomad-black md:text-20">
                  {reservation.activity.title}
                </span>
                <span className="text-14 font-normal text-nomad-black md:text-16">
                  {reservation.date} / {reservation.startTime}-
                  {reservation.endTime} / {reservation.headCount}명
                </span>
                <hr />
                <span className="text-20 font-bold text-nomad-black md:text-32">
                  ₩ {formatNumber(reservation.totalPrice)}
                </span>
              </div>
            </div>
            <div className="flex-center h-100 w-full">
              <Rating starSize={50} onClick={handleChangeRating} />
            </div>
            <div className="relative h-full w-full">
              <textarea
                className="relative h-full w-full flex-1 resize-none overflow-y-auto rounded-md border-1 border-custom-gray-500 p-10 pb-20"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="후기를 작성해주세요"
              ></textarea>
              <span className="absolute bottom-5 right-10">
                {content.length}
              </span>
            </div>
            <div className="mt-12 h-54 md:h-56">
              <Button type="submit" variant="activeButton" hasICon>
                작성하기
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    )
  );
}
