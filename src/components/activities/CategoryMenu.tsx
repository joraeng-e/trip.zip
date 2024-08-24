import classNames from '@/libs/utils/classNames';
import { useState } from 'react';

const CATEGORIES = [
  { value: '전체', icon: '🌍' },
  { value: '문화 · 예술', icon: '🎨' },
  { value: '식음료', icon: '🍽️' },
  { value: '스포츠', icon: '⚽' },
  { value: '투어', icon: '🗺️' },
  { value: '관광', icon: '🧳' },
  { value: '웰빙', icon: '💆‍♀️' },
];

export default function CategoryMenu({
  currentCategory,
  handleCategoryClick,
}: {
  currentCategory?: string;
  handleCategoryClick: (category: string | undefined) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    currentCategory ?? '전체',
  );

  const handleClick = (category: string) => {
    setActiveCategory(category);
    handleCategoryClick(category);
  };

  return (
    <div className="relative min-w-0 flex-1">
      <div className="no-scrollbar flex w-full gap-8 overflow-x-auto md:gap-14 xl:gap-12">
        {CATEGORIES.map((category) => {
          const classnames = classNames(
            'dark-base dark-border flex-shrink-0 rounded-[15px] border-[1.5px] border-custom-green-200 px-10 py-8 leading-26 md:px-28 md:py-16 md:text-18',
            {
              'bg-custom-green-200 dark:bg-custom-green-200 text-white':
                activeCategory === category.value,
              'bg-white text-custom-green-200 hover:bg-[#125742] dark:hover:bg-custom-green-200 hover:text-white':
                activeCategory !== category.value,
            },
          );

          return (
            <button
              key={category.value}
              type="button"
              className={classnames}
              onClick={() => handleClick(category.value)}
            >
              {category.icon} {category.value}
            </button>
          );
        })}
        <div className="ml-16"></div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-50 bg-gradient-to-l from-white to-transparent dark:hidden dark:from-custom-gray-800" />
    </div>
  );
}
