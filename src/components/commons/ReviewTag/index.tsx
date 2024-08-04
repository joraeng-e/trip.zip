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
import { motion } from 'framer-motion';
import React from 'react';

const tags = [
  { name: '스포츠', emoji: <SoccerBallEmoji /> },
  { name: '파티룸', emoji: <PartyEmoji /> },
  { name: '연인추천', emoji: <HeartEmoji /> },
  { name: '리뷰좋은', emoji: <StarEmoji /> },
  { name: '뷰맛집', emoji: <NationalParkEmoji /> },
  { name: '친절해요', emoji: <HuggingFaceEmoji /> },
  { name: '고급스러워요', emoji: <GemEmoji /> },
  { name: '편안해요', emoji: <CouchLampEmoji /> },
  { name: '합리적이에요', emoji: <MoneyWingEmoji /> },
  { name: '청결해요', emoji: <SpongeEmoji /> },
  { name: '주차시설', emoji: <AutomobileEmoji /> },
];

interface ActivityTagsProps {
  extractedTags: string[]; // props를 수정
}

const ActivityTags: React.FC<ActivityTagsProps> = ({ extractedTags }) => {
  return (
    <div className="my-16">
      <div className="flex flex-wrap gap-10">
        {tags
          .filter((tag) => extractedTags.includes(tag.name)) // 선택된 태그만 표시
          .map(({ name, emoji }) => (
            <motion.div
              key={name}
              className="flex items-center rounded-lg p-8"
              style={{
                background: 'linear-gradient(90deg, #6bfdfd, #22ebd0)',
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite',
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              {emoji}
              <span className="mx-4 text-lg-medium text-custom-gray-100">
                {name}
              </span>
            </motion.div>
          ))}
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default ActivityTags;
