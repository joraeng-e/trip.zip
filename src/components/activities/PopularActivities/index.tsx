import useDeviceState from '@/hooks/useDeviceState';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { getActivities } from '@/libs/api/activities';
import Device from '@/libs/constants/device';
import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetActivitiesResponse } from '@trip.zip-api';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { Activity } from '../type';
import PopularActivityCard, { PopularActivityCardSkeleton } from './Card';

const TOTAL_PAGES = 2;
const MAX_ACTIVITIES_COUNT = 9;

function PopularActivities() {
  const [currentPage, setCurrentPage] = useState(0);
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
    if (TOTAL_PAGES > currentPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const currentActivities = useMemo(() => {
    if (deviceState === Device.PC) {
      return data?.pages[currentPage]?.activities || [];
    } else {
      return data?.pages.flatMap((page) => page.activities) || [];
    }
  }, [deviceState, data, currentPage]);

  useEffect(
    function handleScrollFetch() {
      if (deviceState === Device.PC) return;

      const totalActivities =
        data?.pages.flatMap((page) => page.activities).length || 0;
      if (totalActivities >= MAX_ACTIVITIES_COUNT) return;

      if (isIntersecting && hasNextPage) fetchNextPage();
    },
    [isIntersecting, hasNextPage, deviceState, data],
  );

  return (
    <div className="mt-24 md:mt-18 xl:mt-32">
      <div className="flex-center mb-16 justify-between">
        <h1 className="text-18 font-semibold text-nomad-black dark:text-white md:text-36">
          🔥인기 체험
        </h1>
        <div className="flex-center hidden xl:flex">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isError}
            className="disabled:opacity-50"
          >
            <ArrowLeft width="44" height="44" />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === TOTAL_PAGES || isError}
            className="disabled:opacity-50"
          >
            <ArrowRight width="44" height="44" />
          </button>
        </div>
      </div>

      <div className="no-scrollbar -m-20 flex snap-x gap-16 overflow-x-auto scroll-smooth p-20 md:gap-32 xl:gap-24">
        {data?.pages.length !== 0 ? (
          <Content
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            data={currentActivities}
          />
        ) : (
          <div className="flex-center h-186 flex-shrink-0 flex-grow text-18 dark:text-white md:h-[384px]">
            체험이 등록되지 않았습니다.
          </div>
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

export default memo(PopularActivities);

interface ContentProps {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  data: Activity[] | undefined;
}

function Content({
  isLoading,
  isFetchingNextPage,
  isError,
  data,
}: ContentProps) {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <PopularActivityCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex-center h-186 flex-shrink-0 flex-grow text-18 dark:text-white md:h-[384px]">
        에러가 발생하였습니다.
      </div>
    );
  }

  return (
    <>
      {data
        ?.slice(0, MAX_ACTIVITIES_COUNT)
        .map((activity) => (
          <PopularActivityCard key={activity.id} data={activity} />
        ))}
      {isFetchingNextPage && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <PopularActivityCardSkeleton key={`fetching-${index}`} />
          ))}
        </>
      )}
    </>
  );
}
