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
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function ActivityDetail() {
  const router = useRouter();
  const { ActivityId } = router.query;

  const subImageUrls = DetailData.subImageUrls
    .map((image) => image.imageUrl)
    .filter((url) => url);

  const [showButton, setShowButton] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 400) {
      // 400px 이상 스크롤 시 버튼 숨기고 헤더 표시
      setShowButton(false);
      setShowHeader(true);
    } else {
      setShowButton(true);
      setShowHeader(false);
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
        <div className="sticky top-70 z-50 h-70 border-y-1 border-custom-gray-200 bg-white">
          <h2>{DetailData.price} 원 / 인</h2>
        </div>
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
              {/* 70% 차지 */}
              <Title
                title={DetailData.title}
                address={DetailData.address}
                category={DetailData.category}
                rating={DetailData.rating}
                reviewCount={DetailData.reviewCount}
              />
              <Description description={DetailData.description} />
              <Address address={DetailData.address} />
              <Review
                averageRating={ReviewData.averageRating}
                totalCount={ReviewData.totalCount}
                reviews={ReviewData.reviews}
              />
            </div>
            <div className="relative w-3/12">
              {showButton && (
                <div className="sticky top-100 h-300 w-full rounded-lg border-2 border-custom-gray-400">
                  1000원 / 2인
                  <button className="mt-2 w-full rounded-lg bg-blue-500 text-white">
                    예약
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
