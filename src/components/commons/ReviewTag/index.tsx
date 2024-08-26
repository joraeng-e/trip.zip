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
  extractedTags: string[];
  isLoading: boolean;
}

export default function ActivityTags(props: ActivityTagsProps) {
  const { extractedTags, isLoading } = props;

  return (
    <div className="relative min-w-0">
      {isLoading ? (
        <div className="relative h-30"></div>
      ) : (
        <div className="no-scrollbar flex w-full gap-8 overflow-x-auto">
          {tags
            .filter((tag) => extractedTags.includes(tag.name)) // 선택된 태그만 표시
            .map(({ name, emoji }) => (
              <div
                key={name}
                className="dark-border dark-base flex flex-shrink-0 items-center justify-between rounded-lg border border-custom-gray-400 px-6 py-4"
              >
                {emoji}
                <span className="ml-6 text-lg-medium text-nomad-black dark:text-white">
                  {name}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
