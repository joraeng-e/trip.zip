import DetailData from '@/../public/data/activityDetail.json';
import ReviewData from '@/../public/data/activityDetailReview.json';
import {
  Address,
  Description,
  Review,
  Title,
} from '@/components/ActivityDetail';
import {
  GetActivityDetailResponse,
  GetActivityReviewsResponse,
} from '@trip.zip-api';
import React from 'react';

interface DetailContentProps {
  sectionRefs: {
    description: React.RefObject<HTMLDivElement>;
    address: React.RefObject<HTMLDivElement>;
    review: React.RefObject<HTMLDivElement>;
  };
  detailData: GetActivityDetailResponse;
  reviewData: GetActivityReviewsResponse;
}

export default function DetailContent(props: DetailContentProps) {
  const { sectionRefs } = props;
  return (
    <div className="mr-16 flex-1">
      <Title
        title={DetailData.title}
        address={DetailData.address}
        category={DetailData.category}
        rating={DetailData.rating}
        reviewCount={DetailData.reviewCount}
      />
      <div ref={sectionRefs.description} />
      <Description description={DetailData.description} />

      <div ref={sectionRefs.address} />
      <Address address={DetailData.address} />

      <div ref={sectionRefs.review} />
      <Review
        averageRating={ReviewData.averageRating}
        totalCount={ReviewData.totalCount}
        reviews={ReviewData.reviews}
      />
    </div>
  );
}
