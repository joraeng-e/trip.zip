import { getActivities } from '@/libs/api/activities';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Category } from '@trip.zip-api';
import { EmblaOptionsType } from 'embla-carousel';
import router from 'next/router';

import RecommendCarousel from './RecommendCarousel';

interface RecommendProps {
  category: Category;
}

const OPTIONS: EmblaOptionsType = { align: 'start' };

export default function Recommend(props: RecommendProps) {
  const { category } = props;

  const { data } = useQuery({
    queryKey: [
      'activities',
      {
        pageSize: 10,
        category,
      },
    ],
    queryFn: () =>
      getActivities({
        size: 10,
        category,
      }),
    placeholderData: keepPreviousData,
  });

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  const activityId = Number(router.query.activityid);
  const filteredActivities = data.activities.filter(
    (activity) => activity.id !== activityId,
  );
  const SLIDE_COUNT = filteredActivities.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      <div className="dark-base relative my-40 flex items-center justify-between overflow-hidden text-xl-bold text-nomad-black md:overflow-auto">
        {category}과 관련된 다른 체험을 보고 싶다면?
      </div>
      {filteredActivities.length > 0 ? (
        <RecommendCarousel
          slides={SLIDES}
          options={OPTIONS}
          data={filteredActivities}
          id={activityId}
        />
      ) : (
        <div className="dark-base flex h-400 items-center justify-center text-center text-2lg-regular text-nomad-black">
          다른 체험이 없습니다.
        </div>
      )}
    </>
  );
}
