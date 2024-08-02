import ActivityGrid from '@/components/activities/ActivitiyGrid';
import CarouselContainer from '@/components/activities/Carousel';
import CategoryMenu from '@/components/activities/CategoryMenu';
import DropdownContainer from '@/components/activities/Dropdown';
import ActivitiesLayout from '@/components/activities/Layout';
import PopularActivities from '@/components/activities/PopularActivities';
import SearchBox from '@/components/activities/Search/SearchBox';
import SearchResult from '@/components/activities/Search/SearchResult';
import Pagination from '@/components/commons/Pagination';
import useDeviceState from '@/hooks/useDeviceState';
import { getActivities } from '@/libs/api/activities';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PAGE_SIZE_BY_DEVICE = {
  MOBILE: 4,
  TABLET: 9,
  PC: 8,
};

const API_SORT_VALUE = {
  최신순: 'latest',
  '가격이 낮은 순': 'price_asc',
  '가격이 높은 순': 'price_desc',
} as const;

type SortOptions = keyof typeof API_SORT_VALUE;

export default function Activites() {
  const router = useRouter();
  const initialPage = parseInt(router.query.page as string, 10) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState('최신순');
  const deviceState = useDeviceState();

  const { data } = useQuery({
    queryKey: [
      'activities',
      {
        page,
        pageSize: PAGE_SIZE_BY_DEVICE[deviceState],
        category,
        keyword,
        sort,
      },
    ],
    queryFn: () =>
      getActivities({
        sort: API_SORT_VALUE[sort as SortOptions],
        page,
        size: PAGE_SIZE_BY_DEVICE[deviceState],
        category,
        keyword,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: popularActivitiesData } = useQuery({
    queryKey: ['activities', 'popular'],
    queryFn: () => getActivities({ sort: 'most_reviewed', size: 3 }),
  });

  const updateQueryParams = (params: {
    [key: string]: string | number | undefined;
  }) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...params,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    updateQueryParams({ page });
  };

  const handleCategoryClick = (category: string | undefined) => {
    setCategory(category);
    updateQueryParams({ category });
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
    updateQueryParams({ keyword });
  };

  useEffect(() => {
    if (!data) return;

    const pageSize = PAGE_SIZE_BY_DEVICE[deviceState];
    setTotalPages(Math.ceil(data.totalCount / pageSize));
  }, [deviceState, data]);

  useEffect(() => {
    updateQueryParams({ sort: API_SORT_VALUE[sort as SortOptions] });
  }, [sort]);

  useEffect(() => {
    updateQueryParams({ size: PAGE_SIZE_BY_DEVICE[deviceState] });
  }, [deviceState]);

  return (
    <>
      <CarouselContainer />

      <ActivitiesLayout>
        <SearchBox handleKeyword={handleKeyword} />
        {!keyword && <PopularActivities data={popularActivitiesData} />}
        {keyword ? (
          <SearchResult keyword={keyword} totalCount={data?.totalCount} />
        ) : (
          <div className="mt-40 md:mt-54 xl:mt-60">
            <div className="flex justify-between gap-12">
              <CategoryMenu handleCategoryClick={handleCategoryClick} />
              <DropdownContainer value={sort} setValue={setSort} />
            </div>

            <h1 className="my-24 text-18 font-semibold text-nomad-black md:mb-32 md:mt-35 md:text-36">
              🛼 모든 체험
            </h1>
          </div>
        )}
        <ActivityGrid data={data} />
      </ActivitiesLayout>

      <div className="mb-120 mt-38 flex justify-center md:mb-[660px] md:mt-72 xl:mb-[340px] xl:mt-64">
        <Pagination
          onPageChange={handlePageChange}
          totalPages={totalPages}
          initialPage={page}
        />
      </div>
    </>
  );
}
