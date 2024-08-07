import { deleteNotification } from '@/libs/api/myNotifications';
import { XIcon } from '@/libs/utils/Icon';
import { formatTimeAgo } from '@/libs/utils/dateUtils';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { GetMyNotificationsResponse } from '@trip.zip-api';
import { useState } from 'react';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousNotifications = queryClient.getQueryData(['notifications']);

      queryClient.setQueryData(
        ['notifications'],
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
        queryClient.setQueryData(['notifications'], previousNotifications);
      };
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

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
        ></button>
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
