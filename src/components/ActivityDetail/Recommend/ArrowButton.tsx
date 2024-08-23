import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';
import { EmblaCarouselType } from 'embla-carousel';
import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="z-50 m-0 flex h-40 w-40 cursor-pointer touch-manipulation items-center justify-center rounded-xl border-0 bg-transparent bg-white p-0 shadow-md"
      type="button"
      {...restProps}
    >
      <ArrowLeft className="h-30 w-30" />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="z-50 m-0 flex h-40 w-40 cursor-pointer touch-manipulation items-center justify-center rounded-xl border-0 bg-transparent bg-white p-0 shadow-md"
      type="button"
      {...restProps}
    >
      <ArrowRight className="h-30 w-30" />
      {children}
    </button>
  );
};
