import DetailData from '@/../public/data/activityDetail.json';
import ReviewData from '@/../public/data/activityDetailReview.json';
import {
  Address,
  BannerImage,
  Description,
  Review,
  Title,
} from '@/components/ActivityDetail';
import { GetActivityDetailResponse } from '@trip.zip-api';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function ActivityDetail() {
  const router = useRouter();
  const { ActivityId } = router.query;

  const subImageUrls = DetailData.subImageUrls
    .map((image) => image.imageUrl)
    .filter((url) => url);

  return (
    <>
      <Head>
        <title>{DetailData.title} - Trip.zip</title>
        <meta name="description" content={DetailData.description} />
        <meta property="og:title" content={DetailData.title} />
        <meta property="og:description" content={DetailData.description} />
        <meta property="og:image" content={DetailData.bannerImageUrl} />
        <meta
          property="og:url"
          content={`https://trip-zip.vercel.app/activity/${ActivityId}`}
        />
      </Head>
      <div>data id:{DetailData.id}</div>
      <div>router id:{ActivityId}</div>
      <div>
        <Title
          title={DetailData.title}
          address={DetailData.address}
          category={DetailData.category}
          rating={DetailData.rating}
          reviewCount={DetailData.reviewCount}
        />
        <BannerImage
          bannerImageUrl={DetailData.bannerImageUrl}
          subImageUrl={subImageUrls} // 서브 이미지 URL 배열 전달
        />
        <Description description={DetailData.description} />
        <Address address={DetailData.address} />
        <Review
          averageRating={ReviewData.averageRating}
          totalCount={ReviewData.totalCount}
          reviews={ReviewData.reviews}
        />
      </div>
    </>
  );
}
