import { RoundStar } from '@/libs/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';

import { Activity } from '../type';

function ActivityCard({ data }: { data: Activity }) {
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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className="rounded-[20px] object-cover shadow-none brightness-95 filter transition-all duration-300 group-hover:translate-y-[-3px] group-hover:shadow-lg group-hover:shadow-gray-400"
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

export default memo(ActivityCard);

export function ActivityCardSkeleton() {
  return (
    <div className="w-full">
      <div className="relative aspect-square overflow-hidden rounded-[20px] bg-slate-300">
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
      <div className="relative my-4 h-18 w-1/3 overflow-hidden rounded bg-slate-300 md:my-8 md:h-22 md:w-1/6">
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
      <div className="relative h-28 w-3/4 overflow-hidden rounded bg-slate-300 md:h-32 md:w-2/3">
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
      <div className="relative mb-4 mt-12 h-28 w-1/2 overflow-hidden rounded bg-slate-300 md:w-1/3">
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-50" />
      </div>
    </div>
  );
}
