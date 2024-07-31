import React, { useState } from 'react';

const tags = [
  { name: '스포츠', emoji: '🤔' },
  { name: '파티룸', emoji: '🎉' },
  { name: '연인추천', emoji: '✨' },
  { name: '리뷰좋은', emoji: '⭐' },
  { name: '뷰맛집', emoji: '🍽️' },
  { name: '친절해요', emoji: '😊' },
  { name: '고급스러워요', emoji: '🍾' },
  { name: '분위기가 편안해요', emoji: '☕' },
  { name: '가격이 합리적이에요', emoji: '💰' },
  { name: '청결해요', emoji: '🧼' },
  { name: '주차하기 편해요', emoji: '🅿️' },
];

const ActivityTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const tagString = selectedTags.map((tag) => `#${tag}`).join(' ');

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map(({ name, emoji }) => (
          <button
            key={name}
            className={`rounded border px-4 py-2 transition duration-200 ${selectedTags.includes(name) ? 'border-blue-600 bg-blue-500 text-white' : 'border-gray-300 bg-white text-black'}`}
            onClick={() => handleTagClick(name)}
          >
            {emoji} {name}
          </button>
        ))}
      </div>

      <div className="text-lg mb-2">{tagString}</div>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => {
          const selectedTag = tags.find((t) => t.name === tag);
          return selectedTag ? (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-3 py-1 text-gray-700"
            >
              {selectedTag.emoji} {tag}
            </span>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default ActivityTags;
