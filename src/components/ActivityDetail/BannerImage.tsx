import Image from 'next/image';
import React from 'react';

interface ImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function BannerImage(props: ImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;

  return (
    <div className="flex">
      {/* 배너 이미지: 왼쪽 절반 차지 */}
      <div className="relative size-186 flex-shrink-0 rounded-[20px] px-20 pb-24 text-white shadow-none transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-gray-400 md:size-[384px]">
        <Image
          src={bannerImageUrl}
          alt="banner"
          fill
          className="absolute -z-10 rounded-[20px] object-cover brightness-75 filter"
        />
      </div>

      {/* 서브 이미지: 오른쪽 절반 차지, 최대 4개 */}
      {subImageUrl && subImageUrl.length > 0 && (
        <div className="grid w-1/2 grid-cols-2 gap-2">
          {subImageUrl.slice(0, 4).map((url, index) => (
            <div key={index} className="relative h-1/2 w-full">
              <Image
                src={url}
                alt={`sub-image-${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
