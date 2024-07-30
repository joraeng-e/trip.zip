import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

import { NextButton, PrevButton } from './Control';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Children.count(children);

  const updateCurrentSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const contextValue = {
    currentIndex,
    totalSlides,
    updateCurrentSlide,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <PrevButton />
      {children}
      <NextButton />
    </CarouselContext.Provider>
  );
}

// import Image from 'next/image';

// export default function Carousel() {
//   return (
//     <div className="relative h-240 w-full md:h-550">
//       <Image
//         src="/imgs/carousel.png"
//         alt="carousel"
//         fill
//         className="object-cover"
//       />
//     </div>
//   );
// }
