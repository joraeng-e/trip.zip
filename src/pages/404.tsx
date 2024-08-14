import NotFoundLottie from '@/../public/lottie/404.json';
import Button from '@/components/commons/Button';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Custom404() {
  const router = useRouter();
  const goToHome = () => {
    router.push('/');
  };
  return (
    <div className="page-container min-screen flex-center w-full flex-col gap-20">
      <Lottie
        animationData={NotFoundLottie}
        loop={true}
        autoplay={true}
        className="md:w-500"
      />
      <p className="text-xl-semibold">요청하신 페이지를 찾을 수 없습니다.</p>
      <Button
        variant="activeButton"
        hasICon={true}
        onClick={goToHome}
        className="max-w-500"
      >
        GO TO HOME
      </Button>
    </div>
  );
}
