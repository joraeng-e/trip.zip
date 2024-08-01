import { GetActivitiesResponse } from '@trip.zip-api';

import { ActivityCard } from './Card';

export default function ActivityGrid({
  data,
}: {
  data?: GetActivitiesResponse;
}) {
  // TODO: 에러, 로딩 처리
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-24 xl:gap-y-48">
      {data?.activities.map((activity) => (
        <ActivityCard key={activity.id} data={activity} />
      ))}
    </div>
  );
}
