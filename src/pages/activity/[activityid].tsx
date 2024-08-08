import DetailData from '@/../public/data/activityDetail.json';
import ReviewData from '@/../public/data/activityDetailReview.json';
import {
  Address,
  BannerImage,
  Description,
  MobileBannerImage,
  Review,
  Title,
} from '@/components/ActivityDetail';
import ActivityHeader from '@/components/ActivityDetail/ActivityHeader';
import ActivitySideBar from '@/components/ActivityDetail/ActivitySideBar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';

export default function ActivityDetail() {
  const router = useRouter();
  const { ActivityId } = router.query;

  const subImageUrls = DetailData.subImageUrls
    .map((image) => image.imageUrl)
    .filter((url) => url);

  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState('title'); // 현재 활성화된 섹션

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const HEADER_HEIGHT = 140;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 400) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }

    // 현재 섹션 판단
    const titleTop = titleRef.current?.getBoundingClientRect().top || 0;
    const descriptionTop =
      descriptionRef.current?.getBoundingClientRect().top || 0;
    const addressTop = addressRef.current?.getBoundingClientRect().top || 0;
    const reviewTop = reviewRef.current?.getBoundingClientRect().top || 0;

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
        <ActivityHeader
          onScrollToSection={scrollToSection}
          titleRef={titleRef}
          descriptionRef={descriptionRef}
          addressRef={addressRef}
          reviewRef={reviewRef}
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
        <div>
          <div ref={titleRef} />
          <div className="mt-10 hidden md:block">
            <BannerImage
              bannerImageUrl={DetailData.bannerImageUrl}
              subImageUrl={subImageUrls}
            />
          </div>
          <div className="mt-10 md:hidden">
            <MobileBannerImage
              bannerImageUrl={DetailData.bannerImageUrl}
              subImageUrl={subImageUrls}
            />
          </div>

          <div className="mt-10 flex">
            <div className="mr-4 flex-1">
              <div ref={titleRef} />
              <Title
                title={DetailData.title}
                address={DetailData.address}
                category={DetailData.category}
                rating={DetailData.rating}
                reviewCount={DetailData.reviewCount}
              />
              <div ref={descriptionRef} />
              <Description description={DetailData.description} />

              <div ref={addressRef} />
              <Address address={DetailData.address} />

              <div ref={reviewRef} />
              <Review
                averageRating={ReviewData.averageRating}
                totalCount={ReviewData.totalCount}
                reviews={ReviewData.reviews}
              />
            </div>
            <div className="relative mr-16 hidden w-3/12 min-w-300 md:block">
              <ActivitySideBar
                price={DetailData.price}
                schedules={DetailData.schedules}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
