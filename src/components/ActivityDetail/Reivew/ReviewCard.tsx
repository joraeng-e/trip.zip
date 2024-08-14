import BaseImage from '@/../public/imgs/baseProfile.png';
import useExtractTags from '@/hooks/useExtractTags';
import { ReviewResponse } from '@trip.zip-api';
import Image from 'next/image';
import React from 'react';

import ActivityTags from '../../commons/ReviewTag';
import ExpandableText from '../ExpandableText';
import StarRating from './StarRating';

interface ReviewCardProps {
  data: ReviewResponse;
}

export default function ReviewCard(props: ReviewCardProps) {
  const { data } = props;

  const { tags: extractedTags, textWithoutTags } = useExtractTags(data.content);

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
            {}
            <div>
              <div className="text-lg-bold text-nomad-black">
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
            <ExpandableText text={textWithoutTags} />
          </div>
          <ActivityTags extractedTags={extractedTags} />
        </div>
      </div>
    </div>
  );
}
