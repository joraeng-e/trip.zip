import Button from '@/components/commons/Button';
import { Tags } from '@/components/commons/ReviewTag';
import { notify } from '@/components/commons/Toast';
import useClickOutside from '@/hooks/useClickOutside';
import { postReview } from '@/libs/api/myReservations';
import { XIcon } from '@/libs/utils/Icon';
import { formatNumber } from '@/libs/utils/formatNumber';
import { Reservation } from '@trip.zip-api';
import { isAxiosError } from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const handleChangeRating = (rating: number) => {
    setRating(rating);
  };

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rating <= 0) {
      notify('error', '별점을 선택해주세요');
      return;
    }

    const tagsString = selectedTags.map((tag) => `tag:${tag}`).join(' ');
    const reviewData = {
      rating: rating,
      content: content + (tagsString ? ' ' + tagsString : ''),
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-center fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm md:py-100"
      >
        <div
          ref={modalRef}
          className="dark-base relative flex h-full w-full flex-col gap-35 overflow-y-auto border-custom-gray-300 bg-white px-24 py-35 shadow-lg md:w-600 md:rounded-lg md:border-1"
        >
          <div className="flex items-center justify-between">
            <span className="dark-base text-2xl-bold text-custom-black">
              후기작성
            </span>
            <button type="button" onClick={onClose}>
              <XIcon className="size-48 fill-custom-gray-700 dark:fill-white" />
            </button>
          </div>

          <form className="flex h-full flex-col gap-12" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-30">
              <div className="relative size-100 overflow-hidden rounded-xl border-none bg-custom-gray-300 md:size-120">
                <Image
                  className="object-cover"
                  src={reservation.activity.bannerImageUrl}
                  alt="액티비티이미지"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col gap-6">
                <span className="dark-base text-16 font-bold text-nomad-black md:text-2xl-bold">
                  {reservation.activity.title}
                </span>
                <span className="text-14 font-normal text-custom-gray-700 dark:text-white md:text-lg-bold">
                  {reservation.date} / {reservation.startTime}-
                  {reservation.endTime} / {reservation.headCount}명
                </span>
                <hr />
                <span className="dark-base text-20 font-bold text-nomad-black md:text-xl-bold">
                  ₩ {formatNumber(reservation.totalPrice)}
                </span>
              </div>
            </div>
            <div className="flex-center h-100 w-full">
              <Rating starSize={50} onClick={handleChangeRating} />
            </div>

            <div className="my-4">
              <span className="dark-base text-2xl-bold text-nomad-black">
                태그 선택
              </span>
              <p className="text-lg dark-base mt-10 text-nomad-black">
                태그는 총 5개 선택 가능합니다.
              </p>
              <div className="my-20 flex flex-wrap gap-10">
                {Tags.map(({ name, emoji }) => (
                  <motion.div
                    key={name}
                    className={`dark-border flex cursor-pointer items-center rounded-lg border border-custom-gray-400 p-6 ${selectedTags.includes(name) ? 'border-custom-blue-200 bg-custom-blue-100 text-custom-blue-200' : ''}`}
                    onClick={() => handleTagClick(name)}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div>{emoji}</div>
                    <span
                      className={`mx-2 text-lg-medium ${selectedTags.includes(name) ? 'text-lg-bold text-custom-blue-300' : 'text-nomad-black dark:text-white'}`}
                    >
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative h-full w-full">
              <textarea
                className="dark-base relative h-full w-full flex-1 resize-none overflow-y-auto rounded-md border-1 border-custom-gray-500 p-10 pb-20"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="후기를 작성해주세요"
              ></textarea>
              <span className="absolute bottom-5 right-10">
                {content.length}
              </span>
            </div>
            <div className="mt-12 h-100 w-full bg-white md:h-56">
              <Button
                type="submit"
                variant="activeButton"
                hasICon
                className="rounded-md"
              >
                작성하기
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    )
  );
}
