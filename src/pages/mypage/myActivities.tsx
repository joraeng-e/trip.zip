import MyPageLayout from '@/components/mypage/MyPageLayout';
import { getMyActivities } from '@/libs/api/myActivities';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import MyActivityForm from '../../components/ActivitiyForm';
import MyCard from '../../components/activitiesManagement/MyCard';
import Button from '../../components/commons/Button';
import Modal from '../../components/commons/Modal';
import EmptyImage from '/public/imgs/empty.png';

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

  // 모든 활동을 최신순으로 정렬
  const sortedActivities = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => page.activities)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [data]);

  //IntersectionObserver의 역할: 마지막 카드가 화면에 보이는가?
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        //더 로드할 페이지가 있고 + 현재 로딩중이 아니면 => 다음 페이지 로드
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      //마지막 카드 전체가 뷰포트에 들어올 때
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
    setShowActivityForm(true);
  };

  if (status === 'pending') return <div>로딩 중...</div>;
  if (status === 'error') return <div>에러가 발생했습니다.</div>;

  if (showActivityForm) {
    return <MyActivityForm />;
  }

  return (
    <MyPageLayout>
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

        {sortedActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Image src={EmptyImage} alt="빈 이미지" width={200} height={200} />
            <p className="mt-20 text-2xl-medium text-custom-gray-700">
              아직 등록한 체험이 없어요
            </p>
          </div>
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
            {isFetchingNextPage && <div>로딩 중...</div>}
          </>
        )}
      </div>
    </MyPageLayout>
  );
}
