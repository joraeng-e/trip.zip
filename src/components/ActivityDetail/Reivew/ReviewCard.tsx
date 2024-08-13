import useExtractTags from '@/hooks/useExtractTags';
import { BaseProfile } from '@/libs/utils/Icon';
import Image from 'next/image';
import React from 'react';

import ActivityTags from '../../commons/ReviewTag';
import ExpandableText from '../ExpandableText';
import StarRating from './StarRating';

interface ReviewCardProps {
  user: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
  rating: number;
  content: string;
  createdAt: string;
  maxLength?: number;
}

export default function ReviewCard(props: ReviewCardProps) {
  const { user, rating, content, createdAt, maxLength = 100 } = props;

  const { tags: extractedTags, textWithoutTags } = useExtractTags(content);

  return (
    <div className="contour">
      <div className="pt-12">
        <div className="flex items-center gap-12">
          <div className="relative h-40 w-40 overflow-hidden rounded-full">
            <Image
              src={user.profileImageUrl || BaseProfile}
              alt={user.nickname}
              fill
            />
          </div>
          <div>
            <div className="text-lg-bold text-nomad-black">{user.nickname}</div>
            <div className="text-lg-regular text-custom-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="relative my-10 flex items-center gap-12">
          <StarRating rating={rating} />
          <div className="pt-2 text-lg-regular text-custom-gray-700">
            {rating}
          </div>
        </div>
        <ActivityTags extractedTags={extractedTags} />
        <div className="mt-2 text-lg-regular text-nomad-black">
          <ExpandableText text={textWithoutTags} maxLength={maxLength} />
        </div>
      </div>
    </div>
  );
}
