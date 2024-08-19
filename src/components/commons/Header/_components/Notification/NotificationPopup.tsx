import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { getMyNotifications } from '@/libs/api/myNotifications';
import { PaperPlaneIcon, XIcon } from '@/libs/utils/Icon';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetMyNotificationsResponse } from '@trip.zip-api';
import { motion } from 'framer-motion';
import { forwardRef, useEffect, useRef } from 'react';

import NotificationItem from './NotificationItem';

interface Props {
  closePopup: () => void;
}

export default function NotificationPopup({ closePopup }: Props) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery<GetMyNotificationsResponse, Error>({
      queryKey: ['notifications', 'list'],
      queryFn: ({ pageParam: cursorId }) =>
        getMyNotifications({
          size: 3,
          cursorId: cursorId as number | undefined,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
      staleTime: 0,
    });

  const sentinelRef = useRef<HTMLDivElement>(null);
  const mobileSentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);
  const isIntersectingInMobile = useIntersectionObserver(mobileSentinelRef);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(
    function handleScrollFetch() {
      if ((isIntersectingInMobile || isIntersecting) && hasNextPage) {
        fetchNextPage();
      }
    },
    [isIntersecting, hasNextPage, isIntersectingInMobile],
  );

  return (
    <>
      <div className="hidden md:block">
        <TabletAndPCUI
          data={data?.pages.flatMap((page) => page.notifications) || []}
          totalCount={data?.pages[0].totalCount || 0}
          closePopup={closePopup}
          isLoading={isLoading}
          isError={isError}
          ref={sentinelRef}
        />
      </div>

      <div className="block md:hidden">
        <MobileUI
          data={data?.pages.flatMap((page) => page.notifications) || []}
          totalCount={data?.pages[0].totalCount || 0}
          closePopup={closePopup}
          isLoading={isLoading}
          isError={isError}
          ref={mobileSentinelRef}
        />
      </div>
    </>
  );
}

interface UIProps extends Props {
  data: {
    id: number;
    teamId: string;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
}

const TabletAndPCUI = forwardRef<HTMLDivElement, UIProps>(
  ({ data, totalCount, closePopup, isLoading, isError }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="absolute right-100 top-full z-50 mt-20 min-h-160 w-[368px] rounded-[10px] bg-custom-green-100 px-20 py-24 shadow-lg xl:right-0 dark:bg-nomad-black"
      >
        <div className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PaperPlaneIcon width={32} height={32} />
            <h1 className="text-20 font-bold leading-32">
              알림 {!isLoading && `${totalCount}개`}
            </h1>
          </div>
          <button type="button" onClick={closePopup}>
            <XIcon className="size-30 fill-white" />
          </button>
        </div>

        <div className="no-scrollbar flex max-h-300 flex-col gap-8 overflow-y-auto">
          {data.length === 0 && (
            <h1 className="flex-center mt-16 text-custom-gray-800">
              알림이 없습니다.
            </h1>
          )}
          {data.map((notification) => (
            <NotificationItem key={notification.id} data={notification} />
          ))}
          {isError && (
            <h1 className="flex-center mt-16">에러가 발생했습니다.</h1>
          )}

          <div ref={ref} className="h-10 w-full flex-shrink-0 opacity-0" />
        </div>
      </motion.div>
    );
  },
);

TabletAndPCUI.displayName = 'TabletAndPCUI';

const MobileUI = forwardRef<HTMLDivElement, UIProps>(
  ({ data, totalCount, closePopup, isError, isLoading }, ref) => {
    return (
      <div className="fixed inset-0 z-10 overflow-y-auto bg-custom-green-100 px-20 py-40">
        <div className="mb-16 flex justify-between">
          <div className="flex items-center gap-4">
            <PaperPlaneIcon width={32} height={32} />
            <h1 className="text-20 font-bold leading-32">
              알림 {!isLoading && `${totalCount}개`}
            </h1>
          </div>
          <button type="button" onClick={closePopup}>
            <XIcon />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {data.length === 0 && (
            <h1 className="flex-center mt-20 text-custom-gray-800 dark:text-white">
              알림이 없습니다.
            </h1>
          )}
          {data.map((each) => (
            <NotificationItem key={each.id} data={each} />
          ))}
          {isError && (
            <h1 className="flex-center mt-20 dark:text-white">
              에러가 발생했습니다.
            </h1>
          )}

          <div ref={ref} className="h-10 w-full flex-shrink-0" />
        </div>
      </div>
    );
  },
);

MobileUI.displayName = 'MobileUI';
