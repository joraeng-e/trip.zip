import { getActivities } from '@/libs/api/activities';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import PopularActivityCard from './Card';

function PopularActivities() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities', 'popular'],
    queryFn: () => getActivities({ sort: 'most_reviewed', size: 3 }),
  });

  return (
    <>
      <div className="mt-24 md:mt-18 xl:mt-32">
        <h1 className="mb-16 text-18 font-semibold text-nomad-black md:text-36">
          🔥인기 체험
        </h1>
        <div className="no-scrollbar -m-20 flex gap-16 overflow-x-auto p-20 md:gap-32 xl:gap-24">
          {!isLoading ? (
            <>
              {data?.activities.map((activity) => (
                <PopularActivityCard key={activity.id} data={activity} />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <PopularActivityCard.Skeleton key={index} />
              ))}
            </>
          )}
          {isError && (
            <div className="flex-center h-186 flex-grow text-18 md:h-[384px]">
              에러가 발생하였습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(PopularActivities);
