import { ActivityData } from '@/types/api/activities';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

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
              <div className="ml-10 mr-20 w-300 min-w-0 flex-none" key={index}>
                <Link
                  href={`/activity/${data[index].id}`}
                  className="group w-full"
                >
                  <div className="relative h-160 w-300 overflow-hidden">
                    <Image
                      src={data[index].bannerImageUrl}
                      alt={data[index].title}
                      fill
                      className="rounded-lg object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
                  </div>
                  <div className="h-160 flex-col items-center justify-center rounded-md text-2xl-bold text-nomad-black">
                    <div className="dark-base mt-10 text-lg-medium text-custom-gray-700">
                      {data[index].category}
                    </div>
                    <div className="dark-base text-xl-semibold">
                      {data[index].title.length > 16
                        ? `${data[index].title.substring(0, 16)}...`
                        : data[index].title}
                    </div>
                    <div className="dark-base mt-4 text-lg-medium text-custom-gray-700">
                      {data[index].address}
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center rounded-md bg-yellow-200 px-10 text-center">
                        <FaStar className="mb-2 mr-4 h-14 w-14 text-yellow-500" />
                        <span className="text-lg-medium text-yellow-500">
                          {data[index].rating}
                        </span>
                      </div>
                      <div className="ml-10 text-lg-medium">
                        {data[index].reviewCount > 0
                          ? `${data[index].reviewCount}개 리뷰`
                          : '리뷰 없음'}
                      </div>
                    </div>

                    <div className="dark-base mt-10 text-xl-bold dark:text-xl-medium">
                      {data[index].price.toLocaleString()}
                      <span className="dark-base text-md-medium dark:text-md-medium">
                        {' '}
                        원
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
