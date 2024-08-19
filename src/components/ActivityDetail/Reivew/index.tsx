import { getActivityReviews } from '@/libs/api/activities';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Pagination from '../../commons/Pagination';
import ReviewList from './ReviewList';
import ReviewTitle from './ReviewTitle';

const SIZE = 5;

interface ReviewProps {
  sectionRefs: {
    review: React.RefObject<HTMLDivElement>;
  };
}

export default function Review(props: ReviewProps) {
  const router = useRouter();
  const { activityid } = router.query;
  const ActivityId = Number(activityid);
  const { sectionRefs } = props;

  const [page, setPage] = useState<number>(1);
  const { data, isError } = useQuery({
    queryKey: ['Review', { ActivityId, page, SIZE }],
    queryFn: () =>
      page > 0
        ? getActivityReviews(ActivityId, page, SIZE)
        : Promise.resolve(null),
    enabled: page > 0,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      // 페이지 변경 시 스크롤 조정
      if (sectionRefs.review.current) {
        const headerHeight = 150; // 헤더의 높이 (px)
        const scrollToPosition =
          sectionRefs.review.current.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        window.scrollTo({
          top: scrollToPosition,
        });
      }
    }
  };

  if (!data) {
    return <div></div>;
  }

  const totalPages = Math.ceil(data.totalCount / SIZE);

  return (
    <>
      <div>
        <hr className="contour" />
        <ReviewTitle
          averageRating={data.averageRating}
          totalCount={data.totalCount}
        />
        <ReviewList reviewsData={data} isError={isError} />
        {totalPages !== 0 && (
          <div className="my-40 flex justify-center">
            <Pagination
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={page}
            />
          </div>
        )}
      </div>
    </>
  );
}
