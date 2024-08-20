import Plane from '@/../../public/imgs/plane-7206856_1920.jpg';
import Tripzip from '@/../../public/imgs/tripzip.png';
import PlaneLottie from '@/../../public/lottie/plane.json';
import RouteLottie from '@/../../public/lottie/route.json';
import TravelLottie from '@/../../public/lottie/travel.json';
import TravellingLottie from '@/../../public/lottie/travelling.json';
import Button from '@/components/commons/Button';
import StartButton from '@/components/commons/Button/StartButton';
import CarouselInfinity from '@/components/landing/InfiniteCarousel';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Index() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const rightToLeftRef = useRef(null);
  const isInView = useInView(rightToLeftRef, { once: true });
  const leftToRightRef = useRef(null);
  const finalSectionRef = useRef(null);
  const isFinalSectionInView = useInView(finalSectionRef, {
    once: true,
    amount: 0.3,
  });
  const isLeftToRightInView = useInView(leftToRightRef, { once: true });

  const leftToRightVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const rightToLeftVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setShowScrollTop(window.scrollY > 350);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        <div className="animate-darken absolute inset-0 z-10 -mt-200 flex flex-col items-center justify-center px-20">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="-mb-10 -mt-110 text-2xl-medium tracking-wide text-white drop-shadow-lg"
          >
            여행 계획을 쉽고 빠르게 -
          </motion.span>
          <Lottie
            animationData={RouteLottie}
            className="absoulte ml-25 max-w-176 md:ml-30 md:max-w-210"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="-ml-5 -mt-87 px-10 drop-shadow-lg md:-mt-105"
          >
            <Image
              src={Tripzip}
              alt="trip.zip 로고"
              height={125}
              width={400}
              className="relative"
            />
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute left-1/2 top-2/3 z-20 -ml-90 -translate-x-1/2 -translate-y-1/2"
        >
          <StartButton />
        </motion.div>
      </div>
      <div className="relative flex items-center justify-center">
        <hr className="h-80 w-full border-nomad-black bg-nomad-black" />
        <span className="absolute px-4 text-xl-medium text-white">
          Trip.zip과 함께하는 다양한 체험 둘러보기
        </span>
      </div>

      <div className="bg-gray-100 pb-200 pt-100">
        <div className="mb-200 flex h-300 flex-col items-center justify-center gap-40">
          <CarouselInfinity />
        </div>
        <div className="container mx-auto lg:px-200">
          <motion.section
            ref={rightToLeftRef}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={rightToLeftVariants}
            transition={{ duration: 0.5 }}
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
                당신만의 독특한 체험 일정을 만들어보세요.
              </p>
            </div>
          </motion.section>
          <motion.section
            ref={leftToRightRef}
            initial="hidden"
            animate={isLeftToRightInView ? 'visible' : 'hidden'}
            variants={leftToRightVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-200 flex flex-col items-center justify-between gap-12 md:flex-row-reverse"
          >
            <div className="md:w-1/2">
              <Lottie
                animationData={TravellingLottie}
                className="mx-auto w-full max-w-md"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="mb-20 whitespace-nowrap text-xl-bold font-bold md:text-3xl-bold">
                여행의 모든 순간을 완벽하게
              </h2>
              <p className="text-xl whitespace-nowrap text-gray-600 md:text-xl-medium">
                완벽한 일정 관리와 리뷰 시스템으로 <br />
                여행을 더욱 즐겁게 만들어드립니다.
              </p>
            </div>
          </motion.section>
          <motion.section
            ref={finalSectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={
              isFinalSectionInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
            className="mt-200 flex flex-col items-center justify-center text-center"
          >
            <Lottie
              animationData={TravelLottie}
              className="mx-auto w-full max-w-2xl"
            />
            <h2 className="mt-40 text-3xl-bold text-nomad-black">
              Trip.zip과 함께 시작해봐요!
            </h2>
            <p className="text-xl mt-20 max-w-2xl text-gray-600 md:text-xl-medium">
              새로운 체험을 찾고 계신가요?
              <br /> Trip.zip과 함께라면 어떤 여행이든 특별해집니다.
            </p>

            <Link href="/activities">
              <Button
                hasICon={true}
                className="mt-40 rounded-full bg-nomad-black px-40 py-15 text-lg-bold text-white transition-colors duration-300 hover:bg-green-800"
              >
                지금 바로 체험 예약하기
              </Button>
            </Link>
          </motion.section>
        </div>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-10 left-1/2 w-60 -translate-x-1/2 transform rounded-full border border-gray-200 bg-nomad-black p-8 text-white shadow-lg transition-colors duration-300 hover:bg-green-800"
          >
            ▲
          </motion.button>
        )}
      </div>
    </>
  );
}
