import classNames from '@/libs/utils/classNames';
import { useState } from 'react';

const CATEGORIES = [
  '전체',
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
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
      <div className="no-scrollbar flex w-full gap-8 overflow-x-auto md:gap-14 xl:gap-24">
        {CATEGORIES.map((category) => {
          const classnames = classNames(
            'flex-shrink-0 rounded-[15px] border border-custom-green-200 px-10 py-8 leading-26 md:px-36 md:py-16 md:text-18 xl:px-48',
            {
              'bg-custom-green-200 text-white': activeCategory === category,
              'bg-white text-custom-green-200 hover:bg-[#125742] hover:text-white':
                activeCategory !== category,
            },
          );

          return (
            <button
              key={category}
              type="button"
              className={classnames}
              onClick={() => handleClick(category)}
            >
              {category}
            </button>
          );
        })}
        <div className="ml-16"></div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-50 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
