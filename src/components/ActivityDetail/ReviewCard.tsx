import useExtractTags from '@/hooks/useExtractTags';
import { BaseProfile } from '@/libs/utils/Icon';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import ActivityTags from '../commons/ReviewTag';

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

  const [isExpanded, setIsExpanded] = useState(false); // 내용이 확장되었는지 여부

  const handleTextDisplay = isExpanded
    ? textWithoutTags
    : textWithoutTags.length > maxLength
      ? `${textWithoutTags.slice(0, maxLength)}...`
      : textWithoutTags; // maxLength보다 짧은 경우 '...'을 붙이지 않음

  return (
    <>
      <div className="contour">
        <ActivityTags extractedTags={extractedTags} />
        <div className="pt-6">
          <div className="flex items-center gap-12">
            <div className="relative h-40 w-40 overflow-hidden rounded-full">
              <Image
                src={user.profileImageUrl || BaseProfile}
                alt={user.nickname}
                fill
              />
            </div>
            <div>
              <div className="text-lg-bold text-nomad-black">
                {user.nickname}
              </div>
              <div className="text-lg-regular text-custom-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="relative my-10 flex items-center gap-12">
            {renderStars(rating)}
            <div className="pt-2 text-lg-regular text-custom-gray-700">
              {rating}
            </div>
          </div>
          <div className="mt-2 text-lg-regular text-nomad-black">
            <div>{handleTextDisplay}</div>
            {textWithoutTags.length > maxLength && !isExpanded && (
              <button
                className="mt-2 text-custom-gray-700"
                onClick={() => setIsExpanded(true)}
              >
                더 보기
              </button>
            )}
            {isExpanded && (
              <button
                className="mt-2 text-custom-gray-700"
                onClick={() => setIsExpanded(false)}
              >
                접기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// 별 표시 함수
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex">
      {'★'
        .repeat(fullStars)
        .split('')
        .map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      {halfStar ? <FaStar className="text-yellow-500" /> : null}
      {'☆'
        .repeat(emptyStars)
        .split('')
        .map((_, index) => (
          <FaStar
            key={fullStars + halfStar + index}
            className="text-gray-300"
          />
        ))}
      <div></div>
    </div>
  );
};
