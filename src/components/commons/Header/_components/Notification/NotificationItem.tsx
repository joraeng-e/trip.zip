import { deleteNotification } from '@/libs/api/myNotifications';
import { XIcon } from '@/libs/utils/Icon';
import { formatTimeAgo } from '@/libs/utils/dateUtils';
import {
  InfiniteData,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { GetMyNotificationsResponse } from '@trip.zip-api';
import { useRef, useState } from 'react';

import useNotificationDrag from './hooks/useNotificationDrag';

interface Props {
  data: {
    id: number;
    teamId: string;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

const getColor = (string: string) => {
  if (string.includes('승인')) return '#0085FF';
  if (string.includes('거절')) return '#FF472E';
};

export default function NotificationItem({ data }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['notifications', 'list'] });

      const previousNotifications = queryClient.getQueryData([
        'notifications',
        'list',
      ]);

      queryClient.setQueryData(
        ['notifications', 'list'],
        (old: InfiniteData<GetMyNotificationsResponse>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            notifications: page.notifications.filter(
              (notification) => notification.id !== id,
            ),
            totalCount: page.totalCount - 1,
          })),
        }),
      );

      return () => {
        queryClient.setQueryData(
          ['notifications', 'list'],
          previousNotifications,
        );
      };
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'status'] });
    },
  });

  return (
    <>
      <div className="hidden md:block">
        <TabletAndPCUI data={data} mutation={mutation} />
      </div>

      <div className="block md:hidden">
        <MobileUI data={data} mutation={mutation} />
      </div>
    </>
  );
}

interface UIProps extends Props {
  mutation: UseMutationResult<void, Error, number, () => void>;
}

function TabletAndPCUI({ data, mutation }: UIProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      mutation.mutate(data.id);
    }, 500);
  };

  return (
    <div
      className={`flex min-h-[105px] w-full flex-col rounded-[5px] bg-white px-12 py-16 md:min-h-[126px] ${
        isDeleting && 'animate-fadeout'
      }`}
    >
      <div className="flex justify-between">
        <div
          className="size-5 rounded-full"
          style={{ backgroundColor: getColor(data.content) }}
        />
        <button
          type="button"
          className="hidden opacity-50 md:block"
          onClick={handleDelete}
        >
          <XIcon />
        </button>
      </div>

      <p className="mt-4 line-clamp-3 text-14 leading-24 text-nomad-black md:mt-0">
        <HighlightText text={data.content} />
      </p>

      <span className="mt-auto text-12 text-custom-gray-600">
        {formatTimeAgo(data.updatedAt)}
      </span>
    </div>
  );
}

function MobileUI({ data, mutation }: UIProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      mutation.mutate(data.id);
    }, 500);
  };

  const {
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchCancel,
    handleTouchEnd,
    handleTouchMove,
  } = useNotificationDrag({
    ref: containerRef,
    handleDelete,
  });

  return (
    <div
      className={`relative overflow-x-hidden ${isDeleting && 'animate-fadeout'}`}
    >
      <div
        ref={containerRef}
        className="flex min-h-[105px] w-full flex-col rounded-[5px] bg-white px-12 py-16 md:min-h-[126px]"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="flex justify-between">
          <div
            className="size-5 rounded-full"
            style={{ backgroundColor: getColor(data.content) }}
          />
        </div>

        <p className="mt-4 line-clamp-3 text-14 leading-24 text-nomad-black md:mt-0">
          <HighlightText text={data.content} />
        </p>

        <span className="mt-auto text-12 text-custom-gray-600">
          {formatTimeAgo(data.updatedAt)}
        </span>
      </div>

      <div className="flex-center absolute bottom-0 right-0 top-0 -z-10 rounded-r-[5px] bg-gradient-to-l from-red-600 via-red-400 to-transparent pl-100 pr-20 text-white">
        삭제
      </div>
    </div>
  );
}

function HighlightText({ text }: { text: string }) {
  const highlights = [
    { word: '승인', color: '#0085FF' },
    { word: '거절', color: '#FF472E' },
  ];

  const regex = new RegExp(
    `(${highlights.map((h) => h.word).join('|')})`,
    'gi',
  );

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const highlight = highlights.find(
          (h) => h.word.toLowerCase() === part.toLowerCase(),
        );

        return highlight ? (
          <span key={index} style={{ color: highlight.color }}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}
