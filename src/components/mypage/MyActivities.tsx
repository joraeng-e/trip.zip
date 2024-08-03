import { getMyActivities } from '@/libs/api/myActivities';
import { useInfiniteQuery } from '@tanstack/react-query';
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
    getNextPageParam: (lastBatch) => lastBatch.cursorId,
    initialPageParam: undefined,
  });
};

export default function MyActivities() {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMyActivities();

  //마지막 카드가 화면에 보이는가?
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        //마지막 카드가 있고 + 더 로드할 페이지가 있고 + 현재 로딩중이 아니면 => 다음 페이지 로드
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, data]);

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
        <h1 className="text-3xl-bold">내 체험 관리</h1>
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

      {data?.pages.map((batch, batchIndex) => (
        <div key={batchIndex}>
          {batch.activities.map((activity, activityIndex) => (
            <div
              ref={
                batchIndex === batch.activities.length - 1 &&
                activityIndex === batch.activities.length - 1
                  ? lastCardRef
                  : null
              }
              key={activity.id}
            >
              <MyCard {...activity} />
            </div>
          ))}
        </div>
      ))}
      {isFetchingNextPage && <div>로딩 중...</div>}
    </div>
  );
}
