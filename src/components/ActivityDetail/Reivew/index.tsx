import { getActivityReviews } from '@/libs/api/activities';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Pagination from '../../commons/Pagination';
import ReviewList from './ReviewList';
import ReviewTitle from './ReviewTitle';

const SIZE = 5;

export default function Review() {
  const router = useRouter();
  const { activityId } = router.query;
  const ActivityId = Number(activityId);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Review', { ActivityId, page, SIZE }],
    queryFn: () => getActivityReviews(ActivityId, page, SIZE),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생하였습니다.</div>;
  }

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const totalPages = Math.ceil(data.totalCount / SIZE);

  return (
    <div>
      <hr className="contour" />
      <ReviewTitle
        averageRating={data.averageRating}
        totalCount={data.totalCount}
      />
      <ReviewList reviewsData={data} isLoading={isLoading} isError={isError} />
      <div className="my-40 flex justify-center">
        <Pagination
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={page}
        />
      </div>
    </div>
  );
}
