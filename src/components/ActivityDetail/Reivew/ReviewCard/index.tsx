import useExtractTags from '@/hooks/useExtractTags';
import { ReviewResponse } from '@trip.zip-api';
import { memo, useEffect, useState } from 'react';

import ActivityTags from '../../../commons/ReviewTag';
import ExpandableText from '../../ExpandableText';
import ReviewRating from './ReviewRating';
import ReviewUser from './ReviewUser';

interface ReviewCardProps {
  data: ReviewResponse;
}

function ReviewCard(props: ReviewCardProps) {
  const { data } = props;
  const { tags: extractedTags, textWithoutTags } = useExtractTags(data.content);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="contour">
      <div>
        <div className="my-40 flex">
          <ReviewUser
            nickname={data.user.nickname}
            profileImageUrl={data.user.profileImageUrl}
            createdAt={data.createdAt}
          />
          <div>
            <ReviewRating rating={data.rating} />
            <div className="dark-base my-20 text-lg-regular text-nomad-black">
              <ExpandableText text={textWithoutTags} isLoading={isLoading} />
            </div>
            <ActivityTags extractedTags={extractedTags} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ReviewCard);

export function ReviewCardSkeleton() {
  return (
    <div className="contour w-full pt-12">
      <div className="flex items-center gap-12">
        <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
        </div>
        <div className="flex-1">
          <div className="relative my-4 h-20 w-1/5 overflow-hidden rounded bg-slate-300">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
          </div>
          <div className="relative my-4 h-20 w-1/5 overflow-hidden rounded bg-slate-300">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
          </div>
        </div>
      </div>
      <div className="relative my-20 h-20 w-1/6 overflow-hidden rounded bg-slate-300">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
      <div className="relative my-10 h-26 w-1/2 overflow-hidden rounded bg-slate-300">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
      <div className="relative my-10 h-26 w-1/2 overflow-hidden rounded bg-slate-300">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
      <div className="relative my-4 h-40 w-full overflow-hidden rounded bg-slate-300">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
    </div>
  );
}
