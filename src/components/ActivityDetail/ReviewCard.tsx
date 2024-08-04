import useExtractTags from '@/hooks/useExtractTags';
import { BaseProfile } from '@/libs/utils/Icon';
import Image from 'next/image';
import React from 'react';
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
}

export default function ReviewCard(props: ReviewCardProps) {
  const { user, rating, content, createdAt } = props;

  const { tags: extractedTags, textWithoutTags } = useExtractTags(content);

  return (
    <div className="mb-4 border p-4">
      <div className="flex items-center">
        <Image
          src={user.profileImageUrl || BaseProfile}
          alt={user.nickname}
          width={10}
          height={10}
          className="mr-2 h-10 w-10 rounded-full"
        />
        <div>
          <div>{user.nickname}</div>
          <div>{new Date(createdAt).toLocaleDateString()}</div>
        </div>
      </div>
      <div className="mt-2">{renderStars(rating)}</div>
      <div className="mt-2">{textWithoutTags}</div>{' '}
      {/* 태그가 없는 문자열 출력 */}
      <ActivityTags extractedTags={extractedTags} />
    </div>
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
