import { XIcon } from '@/libs/utils/Icon';

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

export default function Notification({ data }: Props) {
  return (
    <div className="flex min-h-[105px] w-full flex-col rounded-[5px] bg-white px-12 py-16 md:min-h-[126px]">
      <div className="flex justify-between">
        <div className="size-5 rounded-full bg-custom-blue-300" />
        <div className="hidden opacity-50 md:block">
          <XIcon />
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-14 leading-24 text-nomad-black md:mt-0">
        {data.content}
      </p>

      <span className="mt-auto text-12 text-custom-gray-600">1분 전</span>
    </div>
  );
}
