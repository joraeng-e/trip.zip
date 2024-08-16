import { GetActivityReviewsResponse } from '@trip.zip-api';

import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviewsData: GetActivityReviewsResponse; // 리뷰 데이터
  isLoading?: boolean;
  isError?: boolean;
}

export default function ReviewList({ reviewsData }: ReviewListProps) {
  return (
    <div>
      {reviewsData?.reviews.map((review) => (
        <ReviewCard key={review.id} data={review} />
      ))}
    </div>
  );
}
