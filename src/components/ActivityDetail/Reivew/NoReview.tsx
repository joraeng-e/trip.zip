import EmptyReview from '@/../public/lottie/empty.json';
import dynamic from 'next/dynamic';
import React from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function NoReview() {
  return (
    <div className="flex h-800 flex-col items-center justify-center text-center text-md-bold text-custom-gray-600 dark:text-white">
      <div className="text-grayscale-400 mb-8 text-xl-medium sm:text-2lg-medium">
        리뷰가 없습니다.
      </div>
      <div className="ml-40">
        <Lottie
          animationData={EmptyReview}
          className="mb-120 mt-100 fill-white dark:fill-custom-black"
        />
      </div>
    </div>
  );
}
