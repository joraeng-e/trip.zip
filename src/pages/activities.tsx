import {
  ActivityCard,
  PopularActivityCard,
} from '@/components/activities/Cards';
import Carousel from '@/components/activities/Carousel';
import CategoryMenu from '@/components/activities/CategoryMenu';
import ActivitiesLayout from '@/components/activities/Layout';
import SearchBox from '@/components/activities/SearchBox';
import Pagination from '@/components/commons/Pagination';
import useDeviceState from '@/hooks/useDeviceState';
import { getActivities } from '@/libs/api/activities';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const PAGE_SIZE_BY_DEVICE = {
  MOBILE: 4,
  TABLET: 9,
  PC: 8,
};

export default function Activites() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const deviceState = useDeviceState();

  const { data } = useQuery({
    queryKey: [
      'activities',
      { page, pageSize: PAGE_SIZE_BY_DEVICE[deviceState], category, keyword },
    ],
    queryFn: () =>
      getActivities({
        sort: 'latest',
        page,
        size: PAGE_SIZE_BY_DEVICE[deviceState],
        category,
        keyword,
      }),
  });

  const { data: popularActivitiesData } = useQuery({
    queryKey: ['activities', 'popular'],
    queryFn: () => getActivities({ sort: 'most_reviewed', size: 3 }),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category);
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    if (!data) return;

    const pageSize = PAGE_SIZE_BY_DEVICE[deviceState];
    setTotalPages(Math.ceil(data.totalCount / pageSize));
  }, [deviceState, data]);

  return (
    <>
      <Carousel.Root>
        <Carousel.Slide1 />
        <Carousel.Slide2 />
        <Carousel.Slide3 />
      </Carousel.Root>

      <ActivitiesLayout>
        <SearchBox handleKeyword={handleKeyword} />
        <div className="mt-24 md:mt-18 xl:mt-32">
          <h1 className="mb-16 text-18 font-semibold text-nomad-black md:text-36">
            🔥인기 체험
          </h1>
          <div className="no-scrollbar -m-20 flex gap-16 overflow-x-auto p-20 md:gap-32 xl:gap-24">
            {popularActivitiesData?.activities.map((activity) => (
              <PopularActivityCard key={activity.id} data={activity} />
            ))}
          </div>
        </div>

        <div className="mt-40 md:mt-54 xl:mt-60">
          <CategoryMenu handleCategoryClick={handleCategoryClick} />
          {/* TODO: 드롭다운 */}
          <h1 className="my-24 text-18 font-semibold text-nomad-black md:mb-32 md:mt-35 md:text-36">
            🛼 모든 체험
          </h1>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-24 xl:gap-y-48">
            {data?.activities.map((activity) => (
              <ActivityCard key={activity.id} data={activity} />
            ))}
          </div>
        </div>
      </ActivitiesLayout>

      <div className="mb-120 mt-38 flex justify-center md:mb-[660px] md:mt-72 xl:mb-[340px] xl:mt-64">
        <Pagination onPageChange={handlePageChange} totalPages={totalPages} />
      </div>
    </>
  );
}
