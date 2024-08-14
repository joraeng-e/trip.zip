import EmptyLottie from '@/../public/lottie/empty.json';
import dynamic from 'next/dynamic';
import React from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function NoActivity() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={EmptyLottie} loop={true} autoplay={true} />
      <p className="mt-20 text-2xl-medium text-custom-gray-700">
        아직 체험이 없어요
      </p>
    </div>
  );
}
