import { useCarouselContext } from './Root';

export function PrevButton() {
  const { currentIndex, totalSlides, updateCurrentSlide } =
    useCarouselContext();

  const handlePrevClick = () => {
    updateCurrentSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  return (
    <button type="button" onClick={handlePrevClick}>
      prev
    </button>
  );
}

export function NextButton() {
  const { currentIndex, totalSlides, updateCurrentSlide } =
    useCarouselContext();

  const handleNextClick = () => {
    updateCurrentSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  return (
    <button type="button" onClick={handleNextClick}>
      next
    </button>
  );
}
