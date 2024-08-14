import Plane from '@/../../public/imgs/plane-7206856_1920.jpg';
import Tripzip from '@/../../public/imgs/text.png';
import PlaneLottie from '@/../../public/lottie/plane.json';
import TravelLottie from '@/../../public/lottie/travel.json';
import Button from '@/components/commons/Button';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const catchphrases = ['다양한 체험을 한 곳에서', '당신만의 특별한 여정'];

export default function Index() {
  return (
    <>
      <Head>
        <title>Trip.zip</title>
        <meta name="description" content="Trip.zip을 시작해보세요." />
        <meta property="og:title" content="로그인 - Trip.zip" />
        <meta
          property="og:description"
          content="Trip.zip과 함께 특별한 여행을 계획해보세요."
        />
      </Head>
      <div className="relative min-h-screen overflow-hidden">
        <Image
          src={Plane}
          alt="배경 하늘"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="z-0"
        />
        <div className="animate-darken absolute inset-0 z-10 -mt-200 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="-mt-100 text-2xl-medium tracking-wide text-white drop-shadow-lg"
          >
            여행 계획을 쉽고 빠르게 -
          </motion.span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="-ml-5 -mt-10 drop-shadow-lg"
          >
            <Image src={Tripzip} alt="trip.zip 로고" width={500} height={125} />
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute left-1/2 top-2/3 z-20 -ml-90 -translate-x-1/2 -translate-y-1/2"
        >
          <button className="max-w-200 rounded-md border border-white border-opacity-60 bg-gray-400 bg-opacity-60 px-40">
            START
          </button>
        </motion.div>

        <div className="text-sm absolute bottom-4 left-4 z-20 rounded bg-black bg-opacity-50 p-2 text-white">
          <p>평균 평점: ⭐⭐⭐⭐⭐ (1000+ 리뷰)</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <hr className="h-80 w-full border-nomad-black bg-nomad-black" />
        <span className="absolute px-4 text-xl-medium text-white">
          Trip.zip과 함께하는 여행 둘러보기
        </span>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-100">
          <div className="flex items-center justify-between gap-40">
            <div className="rounded-lg bg-white p-10 shadow-md">
              <Lottie animationData={PlaneLottie} className="" />
            </div>
            <span className="whitespace-nowrap text-xl-semibold">
              꿈꿔왔던 여행계획을 <br />
              현실로
            </span>
          </div>
          <div className="flex items-center justify-between gap-40">
            <span className="whitespace-nowrap text-xl-semibold">
              여행의 모든 순간을 완벽하게
            </span>
            <div className="h-fit rounded-lg bg-white pt-10 shadow-md">
              <Lottie animationData={TravelLottie} className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
