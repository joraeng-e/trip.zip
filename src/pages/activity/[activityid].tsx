import BannerImage from '@/components/ActivityDetail/Banner/BannerImage';
import MobileBannerImage from '@/components/ActivityDetail/Banner/MobileBannerImage';
import DetailContent from '@/components/ActivityDetail/DetailContent';
import ActivityTabs from '@/components/ActivityDetail/DetailContent/ActivityTabs';
import MobileReservationFooter from '@/components/ActivityDetail/Reservation/MobileReservationFooter';
import ReservationSideBar from '@/components/ActivityDetail/Reservation/ReservationSideBar';
import Loading from '@/components/commons/Loading';
import { getActivityDetail } from '@/libs/api/activities';
import { getUser } from '@/libs/api/user';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function ActivityDetail() {
  const router = useRouter();
  const { activityid } = router.query;
  const ActivityId = Number(activityid);

  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState('title');
  const [isSameUser, setIsSameUser] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['details', ActivityId],
    queryFn: () => getActivityDetail(ActivityId),
    enabled: !!ActivityId,
  });

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    staleTime: 0,
    enabled: !!getCookie('refreshToken'),
  });

  useEffect(() => {
    if (userData && data) {
      setIsSameUser(userData.id === data.userId);
    }
  }, [userData, data]);

  const subImageUrls =
    data?.subImages?.map((image) => image.imageUrl).filter((url) => url) || [];

  const sectionRefs = {
    title: useRef<HTMLDivElement>(null),
    description: useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    review: useRef<HTMLDivElement>(null),
  };

  const HEADER_HEIGHT = 140;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 400) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }

    const titleTop =
      sectionRefs.title.current?.getBoundingClientRect().top || 0;
    const descriptionTop =
      sectionRefs.description.current?.getBoundingClientRect().top || 0;
    const addressTop =
      sectionRefs.address.current?.getBoundingClientRect().top || 0;
    const reviewTop =
      sectionRefs.review.current?.getBoundingClientRect().top || 0;

    if (titleTop < window.innerHeight && titleTop > 0) {
      setActiveSection('title');
    } else if (descriptionTop < window.innerHeight && descriptionTop > 0) {
      setActiveSection('description');
    } else if (addressTop < window.innerHeight && addressTop > 0) {
      setActiveSection('address');
    } else if (reviewTop < window.innerHeight && reviewTop > 0) {
      setActiveSection('review');
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offsetTop =
        ref.current.getBoundingClientRect().top +
        window.scrollY -
        HEADER_HEIGHT;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 찾을 수 없습니다. {ActivityId}</div>;
  }

  return (
    <>
      {showHeader && (
        <ActivityTabs
          onScrollToSection={scrollToSection}
          sectionRefs={sectionRefs}
          activeSection={activeSection}
        />
      )}

      <div className="basic-container relative px-0">
        <Head>
          <title>{data.title} - Trip.zip</title>
          <meta name="description" content={data.description} />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.description} />
          <meta property="og:image" content={data.bannerImageUrl} />
          <meta property="og:url" content={`${ActivityId}`} />
        </Head>
        <div ref={sectionRefs.title} />
        <div>
          <BannerImage
            bannerImageUrl={data.bannerImageUrl}
            subImageUrl={subImageUrls}
          />
          <MobileBannerImage
            bannerImageUrl={data.bannerImageUrl}
            subImageUrl={subImageUrls}
          />
          <div className="mt-10 flex">
            <DetailContent
              sectionRefs={sectionRefs}
              detailData={data}
              isSameUser={isSameUser}
            />
            <div className="relative ml-16 hidden w-3/12 min-w-300 md:block">
              <ReservationSideBar detailData={data} isSameUser={isSameUser} />
            </div>
          </div>
          <MobileReservationFooter data={data} isSameUser={isSameUser} />
        </div>
      </div>
    </>
  );
}
