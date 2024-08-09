import DetailData from '@/../public/data/activityDetail.json';
import ReviewData from '@/../public/data/activityDetailReview.json';
import BannerImage from '@/components/ActivityDetail/Banner/BannerImage';
import MobileBannerImage from '@/components/ActivityDetail/Banner/MobileBannerImage';
import DetailContent from '@/components/ActivityDetail/DetailContent';
import ActivityTabs from '@/components/ActivityDetail/DetailContent/ActivityTabs';
import MobileFooter from '@/components/ActivityDetail/Reservation/MobileReservationFooter';
import ReservationSideBar from '@/components/ActivityDetail/Reservation/ReservationSideBar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function ActivityDetail() {
  const router = useRouter();
  const { ActivityId } = router.query;

  const subImageUrls = DetailData.subImageUrls
    .map((image) => image.imageUrl)
    .filter((url) => url);

  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState('title');

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
          <title>{DetailData.title} - Trip.zip</title>
          <meta name="description" content={DetailData.description} />
          <meta property="og:title" content={DetailData.title} />
          <meta property="og:description" content={DetailData.description} />
          <meta property="og:image" content={DetailData.bannerImageUrl} />
          <meta property="og:url" content={`${ActivityId}`} />
        </Head>
        <div ref={sectionRefs.title} />
        <div>
          <BannerImage
            bannerImageUrl={DetailData.bannerImageUrl}
            subImageUrl={subImageUrls}
          />
          <MobileBannerImage
            bannerImageUrl={DetailData.bannerImageUrl}
            subImageUrl={subImageUrls}
          />
          <div className="mt-10 flex">
            <DetailContent
              sectionRefs={sectionRefs}
              detailData={DetailData}
              reviewData={ReviewData}
            />
            <div className="relative ml-16 hidden w-3/12 min-w-300 md:block">
              <ReservationSideBar
                price={DetailData.price}
                schedules={DetailData.schedules}
              />
            </div>
          </div>
          <MobileFooter />
        </div>
      </div>
    </>
  );
}
