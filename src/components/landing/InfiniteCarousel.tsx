import { getActivities } from '@/libs/api/activities';
import { RoundStar } from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import { GetActivitiesResponse } from '@trip.zip-api';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Activity } from '../activities/type';

type ActivityWithPosition = Activity & { position: number };

function Card({ data }: { data: Activity }) {
  const { title, price, rating, reviewCount, bannerImageUrl } = data;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] shadow-lg">
      <Image
        src={bannerImageUrl}
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
      />
      <div className="absolute inset-0 flex h-full flex-col justify-end p-15">
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
  const [isPc, setIsPc] = useState(false);
  const { data, isLoading, isError } = useActivities();

  const activities = data?.activities || [];

  useEffect(() => {
    const handleResize = () => {
      setIsPc(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getVisibleActivities = (): ActivityWithPosition[] => {
    const positions = isPc ? [-2, -1, 0, 1, 2] : [-1, 0, 1];
    return positions.map((offset) => {
      const index =
        (currentIndex + offset + activities.length) % activities.length;
      return { ...activities[index], position: offset };
    });
  };

  const getCardStyle = (position: number, isPc: boolean) => {
    if (!isPc) {
      return {
        scale: position === 0 ? 1 : 0.9,
        opacity: position === 0 ? 1 : 0.5,
        zIndex: position === 0 ? 20 : 10,
        width: position === 0 ? 300 : 240,
        height: position === 0 ? 300 : 240,
      };
    }

    // PC version
    if (position === 0) {
      return { scale: 1, opacity: 1, zIndex: 30, width: 300, height: 300 };
    } else if (Math.abs(position) === 1) {
      return { scale: 0.85, opacity: 0.7, zIndex: 20, width: 270, height: 270 };
    } else {
      return { scale: 0.7, opacity: 0.5, zIndex: 10, width: 240, height: 240 };
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <AnimatePresence initial={false}>
          {getVisibleActivities().map((activity) => {
            const cardStyle = getCardStyle(activity.position, isPc);
            return (
              <motion.div
                key={`${activity.id}`}
                initial={{
                  x: `${(activity.position + 1) * (isPc ? 110 : 90)}%`,
                  scale: cardStyle.scale,
                  opacity: cardStyle.opacity,
                }}
                animate={{
                  x: `${activity.position * (isPc ? 110 : 90)}%`,
                  scale: cardStyle.scale,
                  opacity: cardStyle.opacity,
                  zIndex: cardStyle.zIndex,
                }}
                exit={{
                  x: `${activity.position * (isPc ? 110 : 90)}%`,
                  scale: cardStyle.scale,
                  opacity: cardStyle.opacity,
                }}
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                }}
                className="absolute rounded-[10px]"
                style={{
                  width: `${cardStyle.width}px`,
                  height: `${cardStyle.height}px`,
                }}
              >
                <Card data={activity} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
