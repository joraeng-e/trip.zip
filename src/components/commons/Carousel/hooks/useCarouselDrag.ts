import { MouseEvent, RefObject, TouchEvent, useState } from 'react';

interface Params {
  ref: RefObject<HTMLElement>;
  currentIndex: number;
  totalSlides: number;
  updateSlide: (slideIndex: number | ((prevIndex: number) => number)) => void;
}

export default function useCarouselDrag({
  ref,
  currentIndex,
  totalSlides,
  updateSlide,
}: Params) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - ref.current.offsetLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchCancel = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - startX;

    if (walk < -100 && currentIndex < totalSlides - 1) {
      updateSlide(currentIndex + 1);
    } else if (walk > 100 && currentIndex > 0) {
      updateSlide(currentIndex - 1);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !ref.current) return;
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = x - startX;

    if (walk < -75 && currentIndex < totalSlides - 1) {
      updateSlide(currentIndex + 1);
    } else if (walk > 75 && currentIndex > 0) {
      updateSlide(currentIndex - 1);
    }
  };

  return {
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchCancel,
    handleTouchEnd,
    handleTouchMove,
  };
}
