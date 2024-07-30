import { useCarouselContext } from './Root';

export function PrevButton() {
  const { currentIndex, updateCurrentSlide } = useCarouselContext();

  const handlePrevClick = () => {};

  return (
    <button type="button" onClick={handlePrevClick}>
      prev
    </button>
  );
}

export function NextButton() {
  const { currentIndex, updateCurrentSlide } = useCarouselContext();

  const handleNextClick = () => {};

  return (
    <button type="button" onClick={handleNextClick}>
      next
    </button>
  );
}
