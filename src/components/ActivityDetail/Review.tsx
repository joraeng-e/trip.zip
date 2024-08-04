import { GetActivityReviewsResponse } from '@trip.zip-api';
import React from 'react';
import { FaStar } from 'react-icons/fa';

import Pagination from '../commons/Pagination';
import ReviewCard from './ReviewCard';

// ReviewCard 컴포넌트 import

export default function Review(props: GetActivityReviewsResponse) {
  const { averageRating, totalCount, reviews } = props;

  const handlePageChange = (page: number) => {
    console.log({ page });
  };

  // 평점에 따라 만족도 텍스트 결정
  const getSatisfactionText = (rating: number) => {
    if (rating >= 4.5) return '매우 만족';
    if (rating >= 4.0) return '만족';
    if (rating >= 3.0) return '좋음';
    if (rating >= 2.0) return '나쁨';
    if (rating >= 1.0) return '매우 나쁨';
    return '평가 없음';
  };

  return (
    <div>
      <hr className="contour" />
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

      {/* 리뷰 목록 표시 */}
      <div>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            user={review.user}
            rating={review.rating}
            content={review.content}
            createdAt={review.createdAt}
          />
        ))}
      </div>
      <Pagination onPageChange={handlePageChange} totalPages={10} />
    </div>
  );
}
