import { MouseEvent, RefObject, TouchEvent, useState } from 'react';

const MAX_DRAG_DISTANCE = -80;

interface Params {
  ref: RefObject<HTMLElement>;
  handleDelete: () => void;
}

export default function useNotificationDrag({ ref, handleDelete }: Params) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (dragTimeout) clearTimeout(dragTimeout);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && ref.current) {
      const deltaX = e.clientX - startX;
      const clampedDeltaX = Math.max(deltaX, MAX_DRAG_DISTANCE);
      ref.current.style.transition = 'none';
      ref.current.style.transform = `translateX(${clampedDeltaX}px)`;

      if (clampedDeltaX <= MAX_DRAG_DISTANCE + 5) {
        if (dragTimeout) clearTimeout(dragTimeout);
        setDragTimeout(
          setTimeout(() => {
            handleDelete();
          }, 200),
        );
      } else {
        if (dragTimeout) {
          clearTimeout(dragTimeout);
          setDragTimeout(null);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (ref.current) {
      ref.current.style.transition = 'transform 0.3s';
      ref.current.style.transform = 'translateX(0px)';
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transition = 'transform 0.3s';
      ref.current.style.transform = 'translateX(0px)';
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (dragTimeout) {
      clearTimeout(dragTimeout);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && ref.current) {
      const deltaX = e.touches[0].clientX - startX;
      const clampedDeltaX = Math.max(deltaX, MAX_DRAG_DISTANCE);
      ref.current.style.transition = 'none';
      ref.current.style.transform = `translateX(${clampedDeltaX}px)`;

      if (clampedDeltaX <= MAX_DRAG_DISTANCE + 5) {
        if (dragTimeout) clearTimeout(dragTimeout);
        setDragTimeout(
          setTimeout(() => {
            handleDelete();
          }, 200),
        );
      } else {
        if (dragTimeout) {
          clearTimeout(dragTimeout);
          setDragTimeout(null);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (ref.current) {
      ref.current.style.transition = 'transform 0.3s';
      ref.current.style.transform = 'translateX(0px)';
    }
    setIsDragging(false);
  };

  const handleTouchCancel = () => {
    if (ref.current) {
      ref.current.style.transition = 'transform 0.3s';
      ref.current.style.transform = 'translateX(0px)';
    }
    setIsDragging(false);
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
