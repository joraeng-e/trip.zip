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
import {
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import Head from 'next/head';
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

const SORT_VALUE = {
  latest: '최신순',
  price_asc: '가격이 낮은 순',
  price_desc: '가격이 높은 순',
};

export default function Activites() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const [category, setCategory] = useState<string | undefined>(
    (router.query.category as string | undefined) || undefined,
  );
  const [keyword, setKeyword] = useState<string | undefined>(
    (router.query.keyword as string | undefined) || undefined,
  );
  const [sort, setSort] = useState(
    router.query.sort
      ? '최신순'
      : SORT_VALUE[router.query.sort as keyof typeof SORT_VALUE],
  );
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const deviceState = useDeviceState();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'activities',
      {
        page,
        pageSize: PAGE_SIZE_BY_DEVICE[deviceState],
        category,
        keyword,
        sort: API_SORT_VALUE[sort as SortOptions],
      },
    ],
    queryFn: () =>
      getActivities({
        page,
        size: PAGE_SIZE_BY_DEVICE[deviceState],
        category,
        keyword,
        sort: API_SORT_VALUE[sort as SortOptions],
      }),
    placeholderData: keepPreviousData,
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
    setPage(1);
    setSort('최신순');
    if (category === '전체') {
      setCategory(undefined);
      updateQueryParams({ page: 1, sort: 'latest', category: undefined });
    } else {
      setCategory(category);
      updateQueryParams({ page: 1, sort: 'latest', category });
    }
  };

  const handleKeyword = (keyword: string) => {
    setPage(1);
    setSort('최신순');
    setCategory(undefined);
    setKeyword(keyword);
    updateQueryParams({ page: 1, sort: 'latest', category: '', keyword });
  };

  useEffect(
    function updateTotalPages() {
      if (!data || data.totalCount === 0) return;

      const pageSize = PAGE_SIZE_BY_DEVICE[deviceState];
      setTotalPages(Math.ceil(data.totalCount / pageSize));
    },
    [deviceState, data],
  );

  useEffect(
    function updateSortNSizeQeury() {
      updateQueryParams({
        sort: API_SORT_VALUE[sort as SortOptions],
        size: PAGE_SIZE_BY_DEVICE[deviceState],
      });
    },
    [sort, deviceState],
  );

  return (
    <>
      <Head>
        <title>홈 - Trip.zip</title>
        <meta
          name="description"
          content="체험 상품을 발견하고 간편하게 예약할 수 있는 Trip.zip에 오신 것을 환영합니다."
        />
        <meta property="og:title" content="홈 - Trip.zip" />
        <meta
          property="og:description"
          content="체험 상품을 발견하고 간편하게 예약할 수 있는 Trip.zip에 오신 것을 환영합니다."
        />
      </Head>
      <CarouselContainer />

      <ActivitiesLayout>
        <SearchBox initialKeyword={keyword} handleKeyword={handleKeyword} />
        {!keyword && <PopularActivities />}
        {keyword ? (
          <SearchResult keyword={keyword} totalCount={data?.totalCount} />
        ) : (
          <div className="mt-40 md:mt-54 xl:mt-60">
            <div className="flex justify-between gap-12">
              <CategoryMenu
                currentCategory={category}
                handleCategoryClick={handleCategoryClick}
              />
              <DropdownContainer value={sort} setValue={setSort} />
            </div>
            <h1 className="my-24 text-18 font-semibold text-nomad-black dark:text-white md:mb-32 md:mt-35 md:text-36">
              {category || <>🛼 모든 체험</>}
            </h1>
          </div>
        )}
        <ActivityGrid
          deviceState={deviceState}
          isLoading={isLoading}
          isError={isError}
          data={data}
        />
      </ActivitiesLayout>

      <div className="mb-120 flex justify-center">
        {totalPages && (
          <Pagination
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={page}
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities', 'popular'],
    queryFn: () =>
      getActivities({
        sort: 'most_reviewed',
        size: 3,
        method: 'cursor',
      }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
