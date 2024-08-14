import useDeviceState from '@/hooks/useDeviceState';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { getActivities } from '@/libs/api/activities';
import Device from '@/libs/constants/device';
import { ArrowLeft, ArrowRight, RoundStar } from '@/libs/utils/Icon';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetActivitiesResponse } from '@trip.zip-api';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { Activity } from '../type';

function PopularActivityCard({ data }: { data: Activity }) {
  const { title, price, rating, reviewCount, bannerImageUrl } = data;
  return (
    <div className="relative h-186 w-[280px] flex-shrink-0 snap-start md:h-[384px] md:w-[384px]">
      <Image
        src={bannerImageUrl}
        alt="banner"
        fill
        className="absolute inset-0 rounded-[20px] object-cover brightness-75 filter"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-16 md:p-24">
        <div className="flex items-center gap-2 text-12 font-semibold text-white md:text-16">
          <RoundStar />
          <span>
            {rating} ({reviewCount})
          </span>
        </div>
        <h1 className="mt-4 line-clamp-2 text-16 font-bold text-white md:mt-8 md:text-24">
          {title}
        </h1>
        <div className="mt-4 md:mt-8">
          <span className="text-16 font-bold text-white md:text-24">
            ₩ {price.toLocaleString()}
          </span>
          <span className="text-12 text-[#a1a1a1] md:text-16">/ 인</span>
        </div>
      </div>
    </div>
  );
}

function PopularActivityCardSkeleton() {
  return (
    <div className="animate-pulse h-186 w-[280px] flex-shrink-0 rounded-[20px] bg-gray-200 md:h-[384px] md:w-[384px]" />
  );
}

export default function PopularActivities() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(Number.POSITIVE_INFINITY);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);
  const deviceState = useDeviceState();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<GetActivitiesResponse, Error>({
    queryKey: ['activities', 'popular'],
    queryFn: ({ pageParam: cursorId }) => {
      return getActivities({
        sort: 'most_reviewed',
        size: 3,
        cursorId: cursorId as number | undefined,
        method: 'cursor',
      });
    },
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
  });

  const handlePrevPage = () => {
    if (currentPage <= 0) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (hasNextPage) fetchNextPage();
    if (totalPages > currentPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (data) setTotalPages(Math.floor(data.pages[0].totalCount / 3));
  }, [data]);

  useEffect(() => {
    if (deviceState === Device.PC) return;
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [isIntersecting, hasNextPage, deviceState, fetchNextPage]);

  let currentActivities: Activity[];
  if (deviceState === Device.PC) {
    currentActivities = data?.pages[currentPage]?.activities || [];
  } else {
    currentActivities = data?.pages.flatMap((page) => page.activities) || [];
  }

  return (
    <div className="mt-24 md:mt-18 xl:mt-32">
      <div className="flex-center mb-16 justify-between">
        <h1 className="text-18 font-semibold text-nomad-black md:text-36">
          🔥인기 체험
        </h1>
        <div className="flex-center hidden xl:flex">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="disabled:opacity-50"
          >
            <ArrowLeft width="44" height="44" />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <ArrowRight width="44" height="44" />
          </button>
        </div>
      </div>

      <div className="no-scrollbar -m-20 flex snap-x gap-16 overflow-x-auto scroll-smooth p-20 md:gap-32 xl:gap-24">
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <PopularActivityCardSkeleton key={index} />
            ))}
          </>
        ) : isError ? (
          <div className="flex-center h-186 flex-shrink-0 flex-grow text-18 md:h-[384px]">
            에러가 발생하였습니다.
          </div>
        ) : (
          <>
            {currentActivities.map((activity) => (
              <PopularActivityCard key={activity.id} data={activity} />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, index) => (
                <PopularActivityCardSkeleton key={`fetching-${index}`} />
              ))}
          </>
        )}
        {!isError && (
          <div
            ref={sentinelRef}
            className="h-186 w-10 flex-shrink-0 opacity-0 md:h-[384px] xl:hidden"
          />
        )}
      </div>
    </div>
  );
}
