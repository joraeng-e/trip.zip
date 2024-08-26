import Button from '@/components/commons/Button';
import DotLoading from '@/components/commons/Loading/DotLoading';
import Modal from '@/components/commons/Modal';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import NoActivity from '@/components/mypage/NoActivity';
import MyCard from '@/components/mypage/activitiesManagement/MyCard';
import { getMyActivities } from '@/libs/api/myActivities';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

const useMyActivities = (size = 10) => {
  return useInfiniteQuery({
    queryKey: ['myActivities', size],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getMyActivities({ cursorId: pageParam, size }),
    getNextPageParam: (lastBatch) => lastBatch.cursorId,
    initialPageParam: undefined,
  });
};

export default function MyActivities() {
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyActivities();

  const sortedActivities = data
    ? data.pages
        .flatMap((page) => page.activities)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
    : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentLastCard = lastCardRef.current;
    if (currentLastCard) {
      observer.observe(currentLastCard);
    }

    return () => {
      if (currentLastCard) {
        observer.unobserve(currentLastCard);
      }
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleConfirm = () => {
    router.push('myActivities/register');
  };

  return (
    <MyPageLayout>
      <div className="z-50 mb-100 ml-10">
        <div className="mb-24 flex items-center justify-between">
          <h1 className="text-3xl-bold">내 체험 관리</h1>
          <Modal.Root>
            <Modal.Trigger>
              <Button className="max-w-150 rounded-md px-16 py-10">
                체험 등록하기
              </Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Description className="text-center">
                체험을 등록하시겠습니까?
              </Modal.Description>
              <Modal.Close onConfirm={handleConfirm} confirm>
                예
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
        </div>

        {sortedActivities.length === 0 ? (
          <NoActivity />
        ) : (
          <>
            {sortedActivities.map((activity, index) => (
              <div
                ref={index === sortedActivities.length - 1 ? lastCardRef : null}
                key={activity.id}
              >
                <MyCard {...activity} />
              </div>
            ))}
            {isFetchingNextPage && <DotLoading />}
          </>
        )}
      </div>
    </MyPageLayout>
  );
}
