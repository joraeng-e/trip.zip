import DetailData from '@/../public/data/activityDetail.json';
import ReviewData from '@/../public/data/activityDetailReview.json';
import {
  GetActivityDetailResponse,
  GetActivityReviewsResponse,
} from '@trip.zip-api';
import React from 'react';

import Review from '../Reivew';
import Address from './Address';
import Description from './Description';
import Title from './Title';

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
    <div className="flex-1">
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
