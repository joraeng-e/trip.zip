import { ActivityData } from '@/types/api/activities';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButton';
import RecommendCard from './RecommendCard';

type EmblaCarouselProps = {
  slides: number[];
  options?: EmblaOptionsType;
  data: ActivityData[];
  id: number;
};

export default function EmblaCarousel(props: EmblaCarouselProps) {
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
      <section className="relative m-auto mb-120 mt-30 max-w-1200">
        <div className="absolute -left-12 top-60 z-50">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="absolute -right-12 top-60 z-50">
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
