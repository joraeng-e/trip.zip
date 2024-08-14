import { GetActivityReviewsResponse } from '@trip.zip-api';

import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviewsData: GetActivityReviewsResponse; // 리뷰 데이터
  isLoading: boolean;
  isError: boolean;
}

export default function ReviewList({
  reviewsData,
  isLoading,
  isError,
}: ReviewListProps) {
  return (
    <div>
      {!isLoading ? (
        <>
          {reviewsData.reviews.map((review) => (
            <ReviewCard key={review.id} data={review} />
          ))}
        </>
      ) : (
        <></>
      )}
      {isError && <></>}
    </div>
  );
}
