import BaseImage from '@/../public/imgs/baseProfile.png';
import useExtractTags from '@/hooks/useExtractTags';
import { ReviewResponse } from '@trip.zip-api';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

import ActivityTags from '../../commons/ReviewTag';
import ExpandableText from '../ExpandableText';
import StarRating from './StarRating';

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
        <div className="pt-12">
          <div className="flex items-center gap-12">
            <div className="relative h-40 w-40 overflow-hidden rounded-full">
              <Image
                src={
                  data.user.profileImageUrl
                    ? data.user.profileImageUrl
                    : BaseImage
                }
                alt={data.user.nickname}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-lg-bold text-nomad-black dark:text-white">
                {data.user.nickname}
              </div>
              <div className="text-lg-regular text-custom-gray-500">
                {new Date(data.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="relative my-10 flex items-center gap-12">
            <StarRating rating={data.rating} />
            <div className="pt-2 text-lg-regular text-custom-gray-700">
              {data.rating}
            </div>
          </div>
          <div className="mt-2 text-lg-regular text-nomad-black">
            <ExpandableText text={textWithoutTags} isLoading={isLoading} />
          </div>
          <ActivityTags extractedTags={extractedTags} isLoading={isLoading} />
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
