import React from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewTitleProps {
  averageRating: number;
  totalCount: number;
}

const getSatisfactionText = (rating: number) => {
  if (rating >= 4.5) return '매우 만족';
  if (rating >= 4.0) return '만족';
  if (rating >= 3.0) return '좋음';
  if (rating >= 2.0) return '나쁨';
  if (rating >= 1.0) return '매우 나쁨';
  return '평가 없음';
};

export default function ReviewTitle(props: ReviewTitleProps) {
  const { averageRating, totalCount } = props;

  return (
    <div className="mx-16">
      <div className="flex items-center gap-10">
        <FaStar className="h-24 w-24 text-yellow-500" />
        <h2 className="text-xl-bold text-nomad-black">{averageRating}</h2>
        <div className="text-2lg-bold text-nomad-black">
          {getSatisfactionText(averageRating)}
        </div>
      </div>
      <div className="mt-10 text-2lg-semibold text-custom-gray-500">
        {totalCount}개 후기
      </div>
    </div>
  );
}