import classNames from '@/libs/utils/classNames';

import { useCarouselContext } from './Root';

export default function CarouselIndicator() {
  const { currentIndex, totalSlides } = useCarouselContext();

  return (
    <div className="absolute left-1/2 top-12 flex -translate-x-1/2 transform space-x-5">
      {[...Array(totalSlides - 2)].map((_, index) => {
        const isActive = index + 1 === currentIndex;

        const classnames = classNames(
          'h-6 md:h-8 rounded-full transition-all duration-300',
          {
            'w-24 md:w-32 bg-custom-green-200': isActive,
            'w-6 md:w-8 bg-gray-300': !isActive,
          },
        );

        return <div key={index} className={classnames} />;
      })}
    </div>
  );
}
