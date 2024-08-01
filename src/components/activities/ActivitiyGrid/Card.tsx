import { RoundStar } from '@/libs/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Activity } from '../type';

export function ActivityCard({ data }: { data: Activity }) {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;
  const [imageSrc, setImageSrc] = useState(bannerImageUrl);

  const handleImageError = () => {
    setImageSrc('/imgs/no-img.png');
  };

  return (
    <Link href={`/activity/${id}`} className="group w-full">
      <div className="relative aspect-square w-full">
        <Image
          src={imageSrc}
          fill
          onError={handleImageError}
          alt="banner"
          className="rounded-[20px] object-cover shadow-none transition-all duration-300 group-hover:translate-y-[-3px] group-hover:shadow-lg group-hover:shadow-gray-400"
        />
      </div>

      <div className="my-4 flex items-center gap-5 text-14 font-semibold leading-24 md:my-8 md:text-16">
        <RoundStar />
        <span>
          {rating} <span className="text-[#a1a1a1]">({reviewCount})</span>
        </span>
      </div>
      <h1 className="line-clamp-2 text-18 font-semibold text-nomad-black md:text-24">
        {title}
      </h1>
      <div className="mb-4 mt-12">
        <span className="text-24 font-bold leading-26">
          ₩ {price.toLocaleString()}{' '}
        </span>
        <span className="leading-24 text-[#a1a1a1]">/ 인</span>
      </div>
    </Link>
  );
}
