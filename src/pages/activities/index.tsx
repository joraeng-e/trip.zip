import Pagination from '@/components/Pagination';
import { Category } from '@trip.zip-api';

import { ActivityCard, PopularActivityCard } from './_components/Cards';
import Carousel from './_components/Carousel';
import CategoryMenu from './_components/CategoryMenu';
import ActivitiesLayout from './_components/Layout';
import SearchBox from './_components/SearchBox';

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

const MOCK_POPULAR_ACTIVITY: Activity = {
  id: 1,
  userId: 101,
  title: '함께 배우면 즐거운 스트릿 댄스',
  description: '설명',
  category: '스포츠',
  price: 38000,
  address: '123 Beachside Ave, Santa Monica, CA',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-8_704_1722240012101.png',
  rating: 4.8,
  reviewCount: 127,
  createdAt: '2023-01-15T08:30:00Z',
  updatedAt: '2023-07-10T10:45:00Z',
};

export default function Activites() {
  return (
    <>
      <Carousel />
      <ActivitiesLayout>
        <SearchBox />
        <div className="mt-24 md:mt-18 xl:mt-32">
          <h1 className="mb-16 text-18 font-semibold text-nomad-black md:text-36">
            🔥인기 체험
          </h1>
          <div className="no-scrollbar -m-20 flex gap-16 overflow-x-auto p-20 md:gap-32 xl:gap-24">
            <PopularActivityCard data={MOCK_POPULAR_ACTIVITY} />
            <PopularActivityCard data={MOCK_POPULAR_ACTIVITY} />
            <PopularActivityCard data={MOCK_POPULAR_ACTIVITY} />
          </div>
        </div>

        <div className="mt-40 md:mt-54 xl:mt-60">
          <CategoryMenu />
          {/* TODO: 드롭다운 */}
          <h1 className="my-24 text-18 font-semibold text-nomad-black md:mb-32 md:mt-35 md:text-36">
            🛼 모든 체험
          </h1>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-24 xl:gap-y-48">
            <ActivityCard data={MOCK_POPULAR_ACTIVITY} />
            <ActivityCard data={MOCK_POPULAR_ACTIVITY} />
            <ActivityCard data={MOCK_POPULAR_ACTIVITY} />
            <ActivityCard data={MOCK_POPULAR_ACTIVITY} />
          </div>
        </div>
      </ActivitiesLayout>

      <div className="mb-120 mt-38 flex justify-center md:mb-[660px] md:mt-72 xl:mb-[340px] xl:mt-64">
        <Pagination totalPages={10} />
      </div>
    </>
  );
}
