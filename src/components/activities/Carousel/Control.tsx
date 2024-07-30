import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';

import { useCarouselContext } from './Root';

export function PrevButton() {
  const { currentIndex, totalSlides, updateCurrentSlide } =
    useCarouselContext();

  const handlePrevClick = () => {
    updateCurrentSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  return (
    <button
      type="button"
      className="absolute left-24 top-1/2 z-20 size-32 -translate-y-1/2 transform rounded-full bg-slate-100 pr-4 opacity-25 hover:opacity-40 md:size-48 xl:size-60"
      onClick={handlePrevClick}
    >
      <ArrowLeft width="100%" height="100%" />
    </button>
  );
}

export function NextButton() {
  const { currentIndex, totalSlides, updateCurrentSlide } =
    useCarouselContext();

  const handleNextClick = () => {
    updateCurrentSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  return (
    <button
      type="button"
      className="absolute right-24 top-1/2 z-20 size-32 -translate-y-1/2 transform rounded-full bg-slate-100 pl-4 opacity-25 hover:opacity-40 md:size-48 xl:size-60 xl:pl-6"
      onClick={handleNextClick}
    >
      <ArrowRight width="100%" height="100%" />
    </button>
  );
}
