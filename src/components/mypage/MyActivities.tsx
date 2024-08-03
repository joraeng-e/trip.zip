import { getMyActivities } from '@/libs/api/myActivities';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React, { useEffect, useRef, useState } from 'react';

import MyActivityForm from '../ActivitiyForm';
import MyCard from '../activitiesManagement/MyCard';
import Button from '../commons/Button';
import Modal from '../commons/Modal';

const useMyActivities = (size = 20) => {
  return useInfiniteQuery({
    queryKey: ['myActivities', size],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getMyActivities({ cursorId: pageParam, size }),
    getNextPageParam: (lastPage) => lastPage.cursorId,
    initialPageParam: undefined,
  });
};

export default function MyActivities() {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMyActivities();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const currentObserver = observerRef.current;
    const currentLastCard = lastCardRef.current;
    if (currentLastCard && currentObserver) {
      currentObserver.observe(currentLastCard);
    }
    return () => {
      if (currentLastCard && currentObserver) {
        currentObserver.unobserve(currentLastCard);
      }
    };
  }, [data]);

  const handleConfirm = () => {
    setShowActivityForm(true);
  };

  if (status === 'pending') return <div>로딩 중...</div>;
  if (status === 'error') return <div>에러가 발생했습니다.</div>;

  if (showActivityForm) {
    return <MyActivityForm />;
  }

  return (
    <div className="mb-50">
      <div className="mb-24 flex items-center justify-between">
        <h1 className="text-3xl-bold">내 체험 등록</h1>
        <Modal.Root>
          <Modal.Trigger>
            <Button className="max-w-120 rounded-md px-16 py-10">
              체험 등록하기
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Description>체험을 등록하시겠습니까?</Modal.Description>
            <Modal.Close onConfirm={handleConfirm} confirm>
              확인
            </Modal.Close>
          </Modal.Content>
        </Modal.Root>
      </div>

      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.activities.map((activity, activityIndex) => (
            <div
              ref={
                pageIndex === data.pages.length - 1 &&
                activityIndex === page.activities.length - 1
                  ? lastCardRef
                  : null
              }
              key={activity.id}
            >
              <MyCard
                bannerImageUrl={activity.bannerImageUrl}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                title={activity.title}
                price={activity.price}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>로딩 중...</div>}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['myActivities', 20],
    queryFn: () => getMyActivities({ size: 20 }),
    initialPageParam: undefined,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
