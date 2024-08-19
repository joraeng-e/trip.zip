import { getActivityDetail } from '@/libs/api/activities';
import { useQuery } from '@tanstack/react-query';
import type { GetActivityDetailResponse } from '@trip.zip-api';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '../commons/Button';

interface Props {
  direction?: 'left' | 'right';
  tags?: string[];
  id: number;
  description: string;
}

export default function ActivityGuide({
  direction = 'left',
  tags,
  id,
  description,
}: Props) {
  const router = useRouter();
  const { data, isError } = useQuery<GetActivityDetailResponse, Error>({
    queryKey: ['recommend', id],
    queryFn: () => getActivityDetail(id),
  });

  const goToActivity = (id: number) => {
    router.push(`/activity/${id}`);
  };

  if (!data) return null;

  return (
    <div
      className={`mb-120 flex flex-col gap-20 md:mb-200 md:flex-row md:gap-30 xl:gap-40 ${direction === 'right' && 'text-right md:flex-row-reverse'}`}
    >
      <div className="relative aspect-[3/2] w-full flex-shrink-0 rounded-[20px] bg-slate-300 md:aspect-square md:w-240 xl:w-300">
        <Image
          src={data?.bannerImageUrl}
          alt="activity-image"
          fill
          className="absolute rounded-[20px] object-cover"
        />
      </div>

      <section className="flex flex-col text-nomad-black">
        <h1 className="text-28 font-bold dark:text-white md:text-32 xl:text-40">
          {data?.title}
        </h1>

        <p
          className="mt-6 dark:text-white"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex flex-wrap gap-6">
          {tags?.map((tag) => (
            <div
              key={tag}
              className="mt-30 rounded-[50px] bg-[#d9d9d9] px-20 py-4 text-14"
            >
              #{tag}
            </div>
          ))}
        </div>

        <Button
          variant="activeButton"
          className={`mt-12 max-h-40 max-w-200 rounded-xl md:mt-auto ${direction === 'right' && 'ml-auto'}`}
          onClick={() => goToActivity(id)}
        >
          체험 보러가기 &#8594;
        </Button>
      </section>
    </div>
  );
}
