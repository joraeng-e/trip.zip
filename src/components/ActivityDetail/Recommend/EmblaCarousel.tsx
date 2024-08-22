import { ActivityData } from '@/types/api/activities';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButton';

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
    <section className="m-auto max-w-1200">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-16 flex touch-pan-y touch-pinch-zoom md:-ml-26 xl:-ml-32">
          {filteredSlides.map((index) => (
            <div className="mx-20 w-300 min-w-0 flex-none" key={index}>
              <div className="relative h-160 w-300">
                <Image
                  src={data[index].bannerImageUrl}
                  alt={data[index].title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="h-300 select-none flex-col items-center justify-center rounded-md text-2xl-bold shadow-md">
                <div>{data[index].title}</div>
                <div>{data[index].address}</div>
                <div>{data[index].rating}</div>
                <div>{data[index].price.toLocaleString()}</div>
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
