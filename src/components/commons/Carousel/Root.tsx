import {
  Children,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import CarouselIndicator from './Indicator';
import CarouselNavigator from './Navigator';
import CarouselSlide from './Slide';
import useCarouselDrag from './hooks/useCarouselDrag';

interface CarouselContextType {
  currentIndex: number;
  totalSlides: number;
  updateSlide: (slideIndex: number | ((prevIndex: number) => number)) => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel 컨텍스트를 호출할 수 없는 범위입니다.');
  }
  return context;
};

export default function CarouselRoot({
  children,
  autoPlay = true,
}: {
  children: ReactNode;
  autoPlay?: boolean;
}) {
  const _children = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children],
  );
  const carouselSlides = useMemo(
    () => _children.filter((child) => child.type === CarouselSlide),
    [_children],
  );
  const carouselNavigator = useMemo(
    () => _children.find((child) => child.type === CarouselNavigator),
    [_children],
  );
  const carouselIndicator = useMemo(
    () => _children.find((child) => child.type === CarouselIndicator),
    [_children],
  );

  const hasMultipleSlides = carouselSlides.length > 1;
  const totalSlides = hasMultipleSlides
    ? carouselSlides.length + 2
    : carouselSlides.length;
  const [currentIndex, setCurrentIndex] = useState(hasMultipleSlides ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateSlide = (
    slideIndex: number | ((prevIndex: number) => number),
  ) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      typeof slideIndex === 'number' ? slideIndex : slideIndex(prevIndex),
    );
  };

  const {
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchCancel,
    handleTouchEnd,
    handleTouchMove,
  } = useCarouselDrag({
    ref: sliderRef,
    currentIndex,
    totalSlides,
    updateSlide,
  });

  const contextValue = {
    currentIndex,
    totalSlides,
    updateSlide,
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      if (!sliderRef.current) return;

      sliderRef.current.style.transition = 'none';
      if (currentIndex === 0) {
        sliderRef.current.style.transform = `translateX(-${carouselSlides.length * 100}%)`;
        setCurrentIndex(carouselSlides.length);
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
  }, [currentIndex, isTransitioning, totalSlides]);

  useEffect(() => {
    if (!autoPlay || !hasMultipleSlides || isTransitioning) return;

    const interval = setInterval(() => {
      updateSlide((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, hasMultipleSlides, isTransitioning]);

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className="group/carousel relative h-240 w-full overflow-hidden md:h-550">
        <div
          ref={sliderRef}
          className={`flex size-full transition-transform duration-500 ease-in-out ${!hasMultipleSlides && 'justify-center'}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchCancel={handleTouchCancel}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {hasMultipleSlides && (
            <div className="size-full flex-shrink-0">
              {carouselSlides[carouselSlides.length - 1]}
            </div>
          )}

          {carouselSlides.map((child, idx) => (
            <div className="size-full flex-shrink-0" key={idx}>
              {child}
            </div>
          ))}

          {hasMultipleSlides && (
            <div className="size-full flex-shrink-0">{carouselSlides[0]}</div>
          )}
        </div>

        {hasMultipleSlides && carouselNavigator}
        {hasMultipleSlides && carouselIndicator}
      </div>
    </CarouselContext.Provider>
  );
}
