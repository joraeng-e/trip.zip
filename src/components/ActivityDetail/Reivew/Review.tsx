import { GetActivityReviewsResponse } from '@trip.zip-api';
import React, { useState } from 'react';

import Pagination from '../../commons/Pagination';
import ReviewCard from './ReviewCard';
import ReviewTitle from './ReviewTitle';

export default function Review(props: GetActivityReviewsResponse) {
  const { averageRating, totalCount, reviews } = props;
  const [page, setPage] = useState(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <hr className="contour" />
      <ReviewTitle averageRating={averageRating} totalCount={totalCount} />
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          user={review.user}
          rating={review.rating}
          content={review.content}
          createdAt={review.createdAt}
        />
      ))}
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={10}
        currentPage={page}
      />
    </div>
  );
}
