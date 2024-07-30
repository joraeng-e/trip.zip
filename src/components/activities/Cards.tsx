import { RoundStar } from '@/libs/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';

import type { Activity } from './type';

export function ActivityCard({ data }: { data: Activity }) {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  return (
    <Link href={`/activity/${id}`} className="group w-full">
      <div className="relative aspect-square w-full">
        <Image
          src={bannerImageUrl}
          fill
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

export function PopularActivityCard({ data }: { data: Activity }) {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  return (
    <Link
      href={`/activity/${id}`}
      className="relative size-186 flex-shrink-0 rounded-[20px] px-20 pb-24 text-white shadow-none transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-gray-400 md:size-[384px]"
    >
      <Image
        src={bannerImageUrl}
        alt="banner"
        fill
        className="absolute -z-10 rounded-[20px] brightness-75 filter"
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
        <span className="font-bold leading-26">
          ₩ {price.toLocaleString()}{' '}
        </span>
        <span className="text-14 leading-24 text-[#a1a1a1]">/ 인</span>
      </div>
    </Link>
  );
}
