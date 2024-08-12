import { RoundStar } from '@/libs/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';

import { Activity } from '../type';

function PopularActivityCard({ data }: { data: Activity }) {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;
  const [imageSrc, setImageSrc] = useState(bannerImageUrl);

  const handleImageError = () => {
    setImageSrc('/imgs/no-img.png');
  };

  return (
    <Link
      href={`/activity/${id}`}
      className="relative size-186 flex-shrink-0 snap-center rounded-[20px] px-20 pb-24 text-white shadow-none transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-gray-400 md:size-[384px]"
    >
      <Image
        src={imageSrc}
        alt="banner"
        fill
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={handleImageError}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        className="absolute -z-10 rounded-[20px] object-cover brightness-75 filter"
      />

      <div className="mt-48 flex items-center gap-5 text-14 font-semibold leading-24 md:mt-174">
        <RoundStar />
        <span>
          {rating} ({reviewCount})
        </span>
      </div>
      <h1 className="mt-6 line-clamp-2 text-18 font-bold leading-26 md:mt-20 md:text-32 md:leading-42">
        {title}
      </h1>
      <div className="absolute bottom-24 md:bottom-30">
        <span className="font-bold leading-26">₩ {price.toLocaleString()}</span>
        <span className="text-14 leading-24 text-[#a1a1a1]">/ 인</span>
      </div>
    </Link>
  );
}

export default memo(PopularActivityCard);

export function PopularActivityCardSkeleton() {
  return (
    <div className="relative size-186 flex-shrink-0 overflow-hidden rounded-[20px] bg-slate-300 md:size-[384px]">
      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
    </div>
  );
}
