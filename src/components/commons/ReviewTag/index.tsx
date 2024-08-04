import {
  AutomobileEmoji,
  CouchLampEmoji,
  GemEmoji,
  HeartEmoji,
  HuggingFaceEmoji,
  MoneyWingEmoji,
  NationalParkEmoji,
  PartyEmoji,
  SoccerBallEmoji,
  SpongeEmoji,
  StarEmoji,
} from '@/libs/utils/Icon';
import React, { useEffect, useState } from 'react';

const tags = [
  { name: '스포츠', emoji: <SoccerBallEmoji /> },
  { name: '파티룸', emoji: <PartyEmoji /> },
  { name: '연인추천', emoji: <HeartEmoji /> },
  { name: '리뷰좋은', emoji: <StarEmoji /> },
  { name: '뷰맛집', emoji: <NationalParkEmoji /> },
  { name: '친절해요', emoji: <HuggingFaceEmoji /> },
  { name: '고급스러워요', emoji: <GemEmoji /> },
  { name: '분위기가 편안해요', emoji: <CouchLampEmoji /> },
  { name: '가격이 합리적이에요', emoji: <MoneyWingEmoji /> },
  { name: '청결해요', emoji: <SpongeEmoji /> },
  { name: '주차하기 편해요', emoji: <AutomobileEmoji /> },
];

interface ActivityTagsProps {
  content: string;
}

const ActivityTags: React.FC<ActivityTagsProps> = ({ content }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // 문자열에서 태그를 추출하여 상태에 설정
    const extractedTags =
      content.match(/#\S+/g)?.map((tag) => tag.substring(1)) || [];
    setSelectedTags(extractedTags);
  }, [content]);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {tags
          .filter((tag) => selectedTags.includes(tag.name)) // 선택된 태그만 표시
          .map(({ name, emoji }) => (
            <span
              key={name}
              className="rounded-full bg-gray-200 px-3 py-1 text-gray-700"
            >
              {emoji} {name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ActivityTags;
