import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import ThumbnailImage from './ThumbnailImage';

interface SwiperImageProps {
  images: string[];
  className?: string;
}

export default function SwiperImage(props: SwiperImageProps) {
  const { images, className } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [imageList] = useState([
    images[images.length - 1],
    ...images,
    images[0],
  ]);
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  const [touch, setTouch] = useState({ start: 0, end: 0 });

  const transitionStyle = {
    transition: 'all 0.4s ease-in-out',
  };

  const updateTransform = (index: number) => ({
    transform: `translateX(-${index * 100}%)`,
    ...transitionStyle,
  });

  const nextSlide = () => {
    setCurrentImgIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentImgIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imageList.length - 2);
      setTimeout(() => {
        ref.current!.style.transform = `translateX(-${imageList.length - 2}00%)`;
        ref.current!.style.transition = '0ms';
      }, 500);
    } else if (currentImgIndex >= imageList.length - 1) {
      setCurrentImgIndex(1);
      setTimeout(() => {
        ref.current!.style.transform = `translateX(-100%)`;
        ref.current!.style.transition = '0ms';
      }, 500);
    }
    ref.current!.style.transform = `translateX(-${currentImgIndex * 100}%)`;
  }, [currentImgIndex, imageList.length]);

  return (
    <div className="relative my-15">
      <div
        className={`relative flex h-310 w-full items-center justify-center overflow-hidden rounded ${className}`}
        onTouchStart={(e) => setTouch({ ...touch, start: e.touches[0].pageX })}
        onTouchMove={(e) => {
          if (ref.current) {
            const current = ref.current.clientWidth * currentImgIndex;
            const result = -current + (e.targetTouches[0].pageX - touch.start);
            ref.current.style.transform = `translate3d(${result}px, 0px, 0px)`;
            ref.current.style.transition = '0ms';
          }
        }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0].pageX;
          if (touch.start > end) {
            nextSlide();
          } else {
            prevSlide();
          }
          setTouch({ ...touch, end });
        }}
      >
        <div
          ref={ref}
          className="flex"
          style={updateTransform(currentImgIndex)}
        >
          {imageList.map((url, index) => (
            <>
              <img
                key={index}
                src={url}
                className="h-auto w-auto object-contain"
              />
            </>
          ))}
        </div>
      </div>
      <div className="mt-10 flex space-x-8 overflow-x-auto whitespace-nowrap">
        {images.map((img, index) => (
          <div className="w-60 flex-none" key={index}>
            <ThumbnailImage
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setCurrentImgIndex(index + 1)} // 썸네일 클릭 시 해당 이미지로 변경
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center text-center text-gray-500">
        {images.map((_, index) => (
          <div
            key={index}
            className={`mr-1 h-[6px] w-[6px] rounded bg-gray-200 ${index + 1 === currentImgIndex ? 'bg-rose-200' : ''}`}
          />
        ))}
      </div>
      <div className="absolute top-[50%] flex w-full justify-between">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-16 opacity-50"
          onClick={prevSlide}
        >
          <ArrowLeft className="size-20" />
        </button>

        {/* 다음 이미지 버튼 */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-16 opacity-50"
          onClick={nextSlide}
        >
          <ArrowRight className="size-20" />
        </button>
      </div>
    </div>
  );
}
