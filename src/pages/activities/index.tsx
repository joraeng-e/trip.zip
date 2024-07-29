import { ActivityCard, PopularActivityCard } from './_components/Cards';
import Carousel from './_components/Carousel';
import ActivitiesLayout from './_components/Layout';
import SearchBox from './_components/SearchBox';

export default function Activites() {
  return (
    <>
      <Carousel />
      <ActivitiesLayout>
        <SearchBox />
        <PopularActivityCard />
        <ActivityCard />
      </ActivitiesLayout>
    </>
  );
}
