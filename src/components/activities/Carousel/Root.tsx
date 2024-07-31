import React, {
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { NextButton, PrevButton } from './Control';
import CarouselDots from './Dots';

interface CarouselContextType {
  currentIndex: number;
  totalSlides: number;
  updateCurrentSlide: (slideIndex: number) => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel 컨텍스트를 호출할 수 없는 범위입니다.');
  }
  return context;
};

export default function CarouselRoot({ children }: { children: ReactNode }) {
  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const totalSlides = childrenArray.length + 2;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const updateCurrentSlide = (
    slideIndex: number | ((prevIndex: number) => number),
  ) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      typeof slideIndex === 'number' ? slideIndex : slideIndex(prevIndex),
    );
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      if (!sliderRef.current) return;

      sliderRef.current.style.transition = 'none';
      if (currentIndex === 0) {
        sliderRef.current.style.transform = `translateX(-${childrenArray.length * 100}%)`;
        setCurrentIndex(childrenArray.length);
      } else if (currentIndex === totalSlides - 1) {
        sliderRef.current.style.transform = 'translateX(-100%)';
        setCurrentIndex(1);
      }

      setTimeout(() => {
        if (!sliderRef.current) return;

        sliderRef.current.style.transition = 'transform 500ms ease-in-out';
        setIsTransitioning(false);
      }, 50);
    };

    if (!sliderRef.current) return;
    sliderRef.current.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      if (!sliderRef.current) return;

      sliderRef.current.removeEventListener(
        'transitionend',
        handleTransitionEnd,
      );
    };
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentSlide((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [updateCurrentSlide]);

  const contextValue = {
    currentIndex,
    totalSlides,
    updateCurrentSlide,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className="relative h-240 overflow-hidden md:h-550">
        <PrevButton />
        <div
          ref={sliderRef}
          className="whitespace-nowrap transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="inline-block w-full">
            {childrenArray[childrenArray.length - 1]}
          </div>

          {childrenArray.map((child, index) => (
            <div key={index} className="inline-block w-full">
              {child}
            </div>
          ))}

          <div className="inline-block w-full">{childrenArray[0]}</div>
        </div>
        <NextButton />

        <CarouselDots />
      </div>
    </CarouselContext.Provider>
  );
}
