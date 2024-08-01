import { GetActivitiesResponse } from '@trip.zip-api';

import PopularActivityCard from './Card';

export default function PopularActivities({
  data,
}: {
  data?: GetActivitiesResponse;
}) {
  // TODO: 에러, 로딩 처리
  return (
    <>
      <div className="mt-24 md:mt-18 xl:mt-32">
        <h1 className="mb-16 text-18 font-semibold text-nomad-black md:text-36">
          🔥인기 체험
        </h1>
        <div className="no-scrollbar -m-20 flex gap-16 overflow-x-auto p-20 md:gap-32 xl:gap-24">
          {data?.activities.map((activity) => (
            <PopularActivityCard key={activity.id} data={activity} />
          ))}
        </div>
      </div>
    </>
  );
}
