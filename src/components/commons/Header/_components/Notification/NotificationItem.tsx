import { deleteNotification } from '@/libs/api/myNotifications';
import { XIcon } from '@/libs/utils/Icon';
import { formatTimeAgo } from '@/libs/utils/dateUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetMyNotificationsResponse } from '@trip.zip-api';

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

export default function NotificationItem({ data }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousNotifications = queryClient.getQueryData(['notifications']);

      queryClient.setQueryData(
        ['notifications'],
        (old: GetMyNotificationsResponse) => ({
          ...old,
          notifications: old.notifications.filter(
            (notification) => notification.id !== id,
          ),
          totalCount: old.totalCount - 1,
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
    mutation.mutate(data.id);
  };

  return (
    <div className="flex min-h-[105px] w-full flex-col rounded-[5px] bg-white px-12 py-16 md:min-h-[126px]">
      <div className="flex justify-between">
        {data.deletedAt ? (
          <div className="size-5 rounded-full bg-custom-red-200" />
        ) : (
          <div className="size-5 rounded-full bg-custom-blue-300" />
        )}
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
