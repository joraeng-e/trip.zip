import CarouselRoot from './Root';
import { PaginationSlide1, PaginationSlide2, PaginationSlide3 } from './Slides';

const Carousel = {
  Root: CarouselRoot,
  Slide1: PaginationSlide1,
  Slide2: PaginationSlide2,
  Slide3: PaginationSlide3,
};

export default function CarouselContainer() {
  return (
    <Carousel.Root>
      <Carousel.Slide1 />
      <Carousel.Slide2 />
      <Carousel.Slide3 />
    </Carousel.Root>
  );
}
