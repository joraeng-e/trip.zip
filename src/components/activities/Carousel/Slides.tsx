import Image from 'next/image';
import { ReactNode } from 'react';

function SlideContainer({ children }: { children: ReactNode }) {
  return (
    <section className="relative h-240 w-full md:h-550">{children}</section>
  );
}

export function PaginationSlide1() {
  return (
    <SlideContainer>
      <span className="absolute left-1/2 top-1/2 z-10 text-100 text-white">
        1
      </span>

      <Image
        src="/imgs/carousel.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </SlideContainer>
  );
}

export function PaginationSlide2() {
  return (
    <SlideContainer>
      <span className="absolute left-1/2 top-1/2 z-10 text-100 text-white">
        2
      </span>

      <Image
        src="/imgs/carousel.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </SlideContainer>
  );
}

export function PaginationSlide3() {
  return (
    <SlideContainer>
      <span className="absolute left-1/2 top-1/2 z-10 text-100 text-white">
        3
      </span>

      <Image
        src="/imgs/carousel.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </SlideContainer>
  );
}
