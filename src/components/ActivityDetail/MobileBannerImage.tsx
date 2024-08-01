import Image from 'next/image';
import React, { useState } from 'react';

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
    <div className="my-15 flex">
      <div
        className={`rounded- relative flex h-310 w-full items-center justify-center overflow-hidden ${className}`}
      >
        <Image
          src={images[currentIndex]}
          alt={`image-${currentIndex}`}
          fill
          className="absolute -z-10 rounded-lg object-cover blur-md filter"
        />
        <Image
          src={images[currentIndex]}
          alt={`image-${currentIndex}`}
          layout="fill"
          className="rounded-lg object-contain"
        />

        {/* 이전 이미지 버튼 */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-2 text-white"
          onClick={prevImage}
        >
          뒤로
        </button>

        {/* 다음 이미지 버튼 */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-2 text-white"
          onClick={nextImage}
        >
          다음
        </button>

        {/* 이미지 개수 표시 버튼 */}
        <div className="absolute bottom-10 right-20 flex">
          <button
            className="rounded bg-custom-green-300 px-4 py-2 text-white"
            onClick={() => console.log('클릭')}
          >
            {`${currentIndex + 1} / ${totalImages}`}
          </button>
        </div>
      </div>
    </div>
  );
}
