import { GetActivityDetailResponse } from '@trip.zip-api';

import Address from './Address';
import Description from './Description';
import Title from './Title';

interface DetailContentProps {
  sectionRefs: {
    description: React.RefObject<HTMLDivElement>;
    address: React.RefObject<HTMLDivElement>;
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
        isSameUser={isSameUser}
      />
      <div ref={sectionRefs.description} />
      <Description description={data.description} />
      <div ref={sectionRefs.address} />
      <Address address={data.address} />
    </div>
  );
}
