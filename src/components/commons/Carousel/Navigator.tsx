import { ReactNode, forwardRef, useImperativeHandle } from 'react';

import { useCarouselContext } from './Root';

export interface CarouselNavigatorRef {
  next: () => void;
  prev: () => void;
}

type CarouselNavigatorType = (prev: () => void, next: () => void) => ReactNode;

export interface CarouselNavigatorProps {
  children: CarouselNavigatorType;
}

const CarouselNavigator = forwardRef<
  CarouselNavigatorRef,
  CarouselNavigatorProps
>((props, ref) => {
  const { children } = props;
  const { updateSlide, currentIndex, totalSlides } = useCarouselContext();

  const handlePrevClick = () => {
    updateSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const handleNextClick = () => {
    updateSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  useImperativeHandle(ref, () => ({
    next: handlePrevClick,
    prev: handleNextClick,
  }));

  return children(handlePrevClick, handleNextClick);
});

CarouselNavigator.displayName = 'CarouselNavigator';

export default CarouselNavigator;
