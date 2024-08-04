import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';
import React, { useState } from 'react';

import BlurBannerImage from './BlurBannerImage';
import SwiperImage from './SwiperImage';
import ThumbnailImage from './ThumbnailImage';

interface MobileImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function MobileBannerImage(props: MobileImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;
  const images = [bannerImageUrl, ...(subImageUrl || [])]; // 모든 이미지를 배열로 결합
  const totalImages = images.length; // 총 이미지 개수
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages); // 다음 이미지로 이동
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages); // 이전 이미지로 이동
  };

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
      <div className="mt-10 flex space-x-8 overflow-x-auto whitespace-nowrap">
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
      {/* <SwiperImage images={images} /> */}
    </div>
  );
}
