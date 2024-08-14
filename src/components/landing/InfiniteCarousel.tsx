import { getActivities } from '@/libs/api/activities';
import { RoundStar } from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import { GetActivitiesResponse } from '@trip.zip-api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Activity } from '../activities/type';

function Card({ data }: { data: Activity }) {
  const { title, price, rating, reviewCount, bannerImageUrl } = data;
  return (
    <div className="relative h-full w-full">
      <Image
        src={bannerImageUrl}
        alt="banner"
        fill
        className="absolute inset-0 rounded-[20px] object-cover brightness-75 filter"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-15">
        <div className="text-xs sm:text-sm flex items-center gap-2 font-semibold text-white">
          <RoundStar />
          <span>
            {rating} ({reviewCount})
          </span>
        </div>
        <h1 className="text-sm sm:text-base md:text-lg mt-1 line-clamp-2 font-bold text-white sm:mt-2">
          {title}
        </h1>
        <div className="mt-1 sm:mt-2">
          <span className="font-bold text-white">
            ₩ {price.toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm text-[#a1a1a1]">/ 인</span>
        </div>
      </div>
    </div>
  );
}

function useActivities() {
  return useQuery<GetActivitiesResponse, Error>({
    queryKey: ['activities'],
    queryFn: () =>
      getActivities({ method: 'offset', sort: 'most_reviewed', size: 10 }),
  });
}

export default function CarouselInfinity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError } = useActivities();

  const activities = data?.activities || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activities.length]);

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching activities
      </div>
    );

  const getVisibleActivities = () => {
    const visibleActivities = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + activities.length) % activities.length;
      visibleActivities.push(activities[index]);
    }
    return visibleActivities;
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex overflow-hidden">
        {getVisibleActivities().map((activity, index) => {
          const isCenter = index === 1;
          let sizeClasses = isCenter
            ? 'w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[390px] lg:h-[390px]'
            : 'w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[260px] md:h-[260px] lg:w-[350px] lg:h-[350px]';
          let opacityClasses = isCenter ? 'opacity-100' : 'opacity-70';
          let scaleClasses = isCenter ? 'scale-100' : 'scale-90';
          let zIndexClasses = isCenter ? 'z-20' : 'z-10';

          return (
            <div
              key={activity.id}
              className={`${sizeClasses} ${opacityClasses} ${scaleClasses} ${zIndexClasses} m-1 flex-shrink-0 transform items-center justify-center rounded-[20px] transition-all duration-[800ms] ease-in-out`}
            >
              <Card data={activity} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
