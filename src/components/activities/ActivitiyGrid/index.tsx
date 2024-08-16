import Device from '@/libs/constants/device';
import { GetActivitiesResponse } from '@trip.zip-api';

import ActivityCard, { ActivityCardSkeleton } from './Card';

export default function ActivityGrid({
  data,
  isLoading,
  isError,
  deviceState,
}: {
  data?: GetActivitiesResponse;
  isLoading: boolean;
  isError: boolean;
  deviceState: Device;
}) {
  let skeletonCount = 4;
  if (deviceState === Device.Mobile) skeletonCount = 4;
  if (deviceState === Device.Tablet) skeletonCount = 9;
  if (deviceState === Device.PC) skeletonCount = 8;

  return (
    <div className="relative min-h-[600px] md:min-h-[1400px] lg:min-h-[1600px] xl:min-h-[900px] [@media(min-width:400px)]:min-h-[700px] [@media(min-width:530px)]:min-h-[800px] [@media(min-width:630px)]:min-h-[930px]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-24 xl:gap-y-48">
        {!isLoading ? (
          <>
            {data?.activities.map((activity) => (
              <ActivityCard key={activity.id} data={activity} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: skeletonCount }).map((_, idx) => (
              <ActivityCardSkeleton key={idx} />
            ))}
          </>
        )}
      </div>
      {data?.activities.length === 0 && (
        <div className="flex-center absolute inset-0 text-18">
          체험이 등록되지 않았습니다.
        </div>
      )}
      {isError && (
        <div className="flex-center absolute inset-0 text-18">
          에러가 발생하였습니다.
        </div>
      )}
    </div>
  );
}
