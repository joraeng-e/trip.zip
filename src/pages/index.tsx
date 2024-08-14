import Plane from '@/../../public/imgs/plane-7206856_1920.jpg';
import Tripzip from '@/../../public/imgs/tripzip.png';
import PlaneLottie from '@/../../public/lottie/plane.json';
import RouteLottie from '@/../../public/lottie/route.json';
import TravelLottie from '@/../../public/lottie/travel.json';
import Carousel from '@/components/commons/Carousel';
import CarouselInfinity from '@/components/landing/InfiniteCarousel';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export default function Index() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
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
            className="-mb-50 -mt-180 text-2xl-medium tracking-wide text-white drop-shadow-lg"
          >
            여행 계획을 쉽고 빠르게 -
          </motion.span>
          <Lottie
            animationData={RouteLottie}
            className="absoulte ml-40 w-265"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="-ml-5 -mt-130 drop-shadow-lg"
          >
            <Image
              src={Tripzip}
              alt="trip.zip 로고"
              width={500}
              height={125}
              className="relative"
            />
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute left-1/2 top-2/3 z-20 -ml-90 -translate-x-1/2 -translate-y-1/2"
        >
          <button className="ml-15 max-w-200 rounded-2xl border-2 border-white border-opacity-60 bg-gray-200 bg-opacity-60 p-10 px-40 text-lg-bold hover:bg-opacity-90 hover:duration-500">
            START
          </button>
        </motion.div>
      </div>
      <div className="relative flex items-center justify-center">
        <hr className="h-80 w-full border-nomad-black bg-nomad-black" />
        <span className="absolute px-4 text-xl-medium text-white">
          Trip.zip과 함께하는 여행 둘러보기
        </span>
      </div>

      <div className="bg-gray-100 pb-100">
        <div className="mb-90 rounded pt-10 text-center">
          <p>평균 평점: ⭐⭐⭐⭐⭐ (1000+ 리뷰)</p>
        </div>
        <div className="container mx-auto lg:px-200">
          <div className="mb-200 flex h-300 flex-col items-center justify-center gap-40">
            <CarouselInfinity />
          </div>
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-200 flex flex-col items-center justify-between gap-12 md:flex-row"
          >
            <div className="md:w-1/2">
              <Lottie
                animationData={PlaneLottie}
                className="mx-auto w-full max-w-md"
              />
            </div>
            <div className="text-center md:text-right">
              <h2 className="mb-20 whitespace-nowrap text-xl-bold md:text-3xl-bold">
                꿈꿔왔던 여행계획을 현실로
              </h2>
              <p className="text-xl whitespace-nowrap text-gray-600 md:text-xl-medium">
                당신만의 완벽한 여행 일정을 만들어보세요.
              </p>
            </div>
          </motion.section>
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-between gap-12 md:flex-row-reverse"
          >
            <div className="md:w-1/2">
              <Lottie
                animationData={TravelLottie}
                className="mx-auto w-full max-w-md"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="mb-20 whitespace-nowrap text-xl-bold font-bold md:text-3xl-bold">
                여행의 모든 순간을 완벽하게
              </h2>
              <p className="text-xl whitespace-nowrap text-gray-600 md:text-xl-medium">
                실시간 일정 관리와 리뷰 시스템으로 여행을 <br />
                더욱 즐겁게 만들어드립니다.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
