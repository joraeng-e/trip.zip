import { ActivityData } from '@/types/api/activities';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

type RecommendCardProps = {
  activity: ActivityData;
};

export default function RecommendCard(props: RecommendCardProps) {
  const { activity } = props;

  return (
    <div className="ml-10 mr-20 w-300 min-w-0 flex-none">
      <Link href={`/activity/${activity.id}`} className="group w-full">
        <div className="relative h-160 w-300 overflow-hidden">
          <Image
            src={activity.bannerImageUrl}
            alt={activity.title}
            fill
            className="rounded-lg object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
        </div>
        <div className="h-160 flex-col items-center justify-center rounded-md text-2xl-bold text-nomad-black">
          <div className="dark-base mt-10 text-lg-medium text-custom-gray-700">
            {activity.category}
          </div>
          <div className="dark-base text-xl-semibold">
            {activity.title.length > 16
              ? `${activity.title.substring(0, 16)}...`
              : activity.title}
          </div>
          <div className="dark-base mt-4 text-lg-medium text-custom-gray-700">
            {activity.address}
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex items-center rounded-md bg-yellow-200 px-10 text-center">
              <FaStar className="mb-2 mr-4 h-14 w-14 text-yellow-500" />
              <span className="text-lg-medium text-yellow-500">
                {activity.rating}
              </span>
            </div>
            <div className="ml-10 text-lg-medium">
              {activity.reviewCount > 0
                ? `${activity.reviewCount}개 리뷰`
                : '리뷰 없음'}
            </div>
          </div>

          <div className="dark-base mt-10 text-xl-bold dark:text-xl-medium">
            {activity.price.toLocaleString()}
            <span className="dark-base text-md-medium dark:text-md-medium">
              {' '}
              원
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
