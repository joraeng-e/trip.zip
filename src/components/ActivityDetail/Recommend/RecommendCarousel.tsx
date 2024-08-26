import { ActivityData } from '@/types/api/activities';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButton';
import RecommendCard from './RecommendCard';

type RecommendCarouselProps = {
  slides: number[];
  options?: EmblaOptionsType;
  data: ActivityData[];
  id: number;
};

export default function RecommendCarousel(props: RecommendCarouselProps) {
  const { slides, options, data, id } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const filteredSlides = slides.filter((index) => data[index].id !== id);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <section className="relative mb-120 mt-30 max-w-1200 px-10">
        <div className="absolute -left-0 top-60 z-50">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="absolute -right-0 top-60 z-50">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {filteredSlides.map((index) => (
              <RecommendCard key={index} activity={data[index]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
