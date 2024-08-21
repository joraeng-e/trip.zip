import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButton';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

export default function EmblaCarousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="m-auto max-w-1120">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-16 flex touch-pan-y touch-pinch-zoom md:-ml-26 xl:-ml-32">
          {slides.map((index) => (
            <div className="w-300 min-w-0 flex-none pl-16" key={index}>
              <div className="flex h-300 select-none items-center justify-center rounded-md text-2xl-bold shadow-md">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-30 grid grid-cols-[auto_1fr] justify-center gap-20">
        <div className="grid grid-cols-2 items-center gap-10">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
}
