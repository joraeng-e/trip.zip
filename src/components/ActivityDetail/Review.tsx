import { GetActivityReviewsResponse } from '@trip.zip-api';
import React from 'react';

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

  // 별 표시 함수
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div>
        {'★'.repeat(fullStars)}
        {halfStar ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div>
      {/* 평균 평점과 만족도 표시 */}
      <div>
        {renderStars(averageRating)} {/* 평점을 별로 표시 */}
        <span>{getSatisfactionText(averageRating)}</span> {/* 만족도 텍스트 */}
      </div>

      {/* 총 후기 개수 표시 */}
      <div>{totalCount}개 후기</div>

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
