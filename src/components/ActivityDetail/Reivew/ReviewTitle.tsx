import EmptyReview from '@/../public/lottie/emptyReview.json';
import dynamic from 'next/dynamic';
import React from 'react';
import { FaStar } from 'react-icons/fa';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

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
      {totalCount === 0 ? (
        <div className="my-100 flex flex-col items-center text-center text-md-bold text-custom-gray-600 dark:text-white">
          <div className="text-grayscale-400 mb-8 text-xl-medium sm:text-2lg-medium">
            리뷰가 없습니다.
          </div>
          <div className="ml-40">
            <Lottie
              animationData={EmptyReview}
              style={{ width: '280px', height: '280px' }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-10">
            <FaStar className="h-24 w-24 text-yellow-500" />
            <h2 className="text-xl-bold text-nomad-black dark:text-white">
              {averageRating}
            </h2>
            <div className="text-2lg-bold text-nomad-black dark:text-white">
              {getSatisfactionText(averageRating)}
            </div>
          </div>
          <div className="mt-10 text-2lg-semibold text-custom-gray-500">
            {totalCount}개 후기
          </div>
        </>
      )}
    </div>
  );
}
