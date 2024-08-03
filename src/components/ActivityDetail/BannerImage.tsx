import Image from 'next/image';
import React from 'react';

interface ImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
}

export default function BannerImage(props: ImageProps) {
  const { bannerImageUrl, subImageUrl } = props;

  return (
    <div className="flex">
      {/* 배너 이미지: 왼쪽 절반 차지 */}
      <div className="relative w-1/2">
        <Image
          src={bannerImageUrl}
          alt="carousel"
          fill
          className="object-cover"
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
