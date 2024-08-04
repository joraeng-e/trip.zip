import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';
import React, { useEffect, useRef, useState } from 'react';

import BlurBannerImage from './BlurBannerImage';
import ThumbnailImage from './ThumbnailImage';

interface MobileImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function MobileBannerImage(props: MobileImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;
  const images = [bannerImageUrl, ...(subImageUrl || [])];
  const totalImages = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  // 현재 인덱스를 기준으로 썸네일 스크롤 위치 조정
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnailWidth = thumbnailRef.current.clientWidth / totalImages;
      const offset = currentIndex * thumbnailWidth - thumbnailWidth / 2;
      thumbnailRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [currentIndex, totalImages]);

  return (
    <div className="my-15 flex flex-col">
      <div
        className={`relative flex h-310 w-full items-center justify-center overflow-hidden rounded ${className}`}
      >
        <BlurBannerImage
          src={images[currentIndex]}
          alt={`image-${currentIndex}`}
        />

        {/* 이전 이미지 버튼 */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-16 opacity-50"
          onClick={prevImage}
        >
          <ArrowLeft className="size-20" />
        </button>

        {/* 다음 이미지 버튼 */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-16 opacity-50"
          onClick={nextImage}
        >
          <ArrowRight className="size-20" />
        </button>

        {/* 이미지 개수 표시 버튼 */}
        <div className="absolute bottom-10 right-16 flex">
          <div className="rounded bg-custom-gray-700 px-8 py-2 text-custom-gray-100">
            {`${currentIndex + 1} / ${totalImages}`}
          </div>
        </div>
      </div>

      {/* 썸네일 이미지 표시 */}
      <div
        ref={thumbnailRef}
        className="mt-10 flex cursor-pointer space-x-8 overflow-x-hidden"
      >
        {images.map((img, index) => (
          <div className="w-60 flex-none" key={index}>
            <ThumbnailImage
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setCurrentIndex(index)} // 썸네일 클릭 시 해당 이미지로 변경
            />
          </div>
        ))}
      </div>
    </div>
  );
}
