import { XIcon } from '@/libs/utils/Icon';
import { formatTimeAgo } from '@/libs/utils/dateUtils';

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
  return (
    <div className="flex min-h-[105px] w-full flex-col rounded-[5px] bg-white px-12 py-16 md:min-h-[126px]">
      <div className="flex justify-between">
        {data.deletedAt ? (
          <div className="size-5 rounded-full bg-custom-red-200" />
        ) : (
          <div className="size-5 rounded-full bg-custom-blue-300" />
        )}
        <div className="hidden opacity-50 md:block">
          <XIcon />
        </div>
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
