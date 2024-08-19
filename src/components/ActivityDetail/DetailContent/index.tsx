import { GetActivityDetailResponse } from '@trip.zip-api';
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
  isSameUser: boolean;
}

export default function DetailContent(props: DetailContentProps) {
  const { sectionRefs, isSameUser } = props;

  const data = props.detailData;

  return (
    <div className="flex-1">
      <Title
        title={data.title}
        address={data.address}
        category={data.category}
        rating={data.rating}
        reviewCount={data.reviewCount}
        id={data.id}
        isSameUser={isSameUser}
      />
      <div ref={sectionRefs.description} />
      <Description description={data.description} />
      <div ref={sectionRefs.address} />
      <Address address={data.address} />
      <div ref={sectionRefs.review} />
      <Review sectionRefs={sectionRefs} />
    </div>
  );
}
