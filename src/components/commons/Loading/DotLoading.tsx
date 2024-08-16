import LoadingLottie from '@/../public/lottie/loading.json';
import dynamic from 'next/dynamic';
import React from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function DotLoading() {
  return (
    <div className="page-container flex-center">
      <Lottie animationData={LoadingLottie} loop={true} autoplay={true} />
    </div>
  );
}
