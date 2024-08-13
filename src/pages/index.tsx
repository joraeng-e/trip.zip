import Plane from '@/../../public/imgs/plane-7206856_1920.jpg';
import Tripzip from '@/../../public/imgs/text.png';
import Button from '@/components/commons/Button';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export default function Index() {
  return (
    <>
      <Head>
        <title>Trip.zip</title>
        <meta name="description" content="Trip.zip을 시작해보세요." />
        <meta property="og:title" content="로그인 - Trip.zip" />
        <meta property="og:description" content="Trip.zip을 시작해보세요." />
      </Head>
      <div className="">
        <Image
          src={Plane}
          alt="배경 하늘"
          // layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="z-0"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl mb-4 font-bold tracking-wide text-white drop-shadow-lg"
          >
            여행 계획을 쉽고 빠르게 -
          </motion.span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image src={Tripzip} alt="trip.zip 로고" width={400} height={200} />
          </motion.div>
          <Button className="h-100 w-200">START</Button>
          {/* <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 text-white"
          >
            <span className="text-2xl">▼</span>
          </motion.div> */}
        </div>
        <div className="text-sm bottom-4 left-4 text-white">
          <p>평균 평점: ⭐⭐⭐⭐⭐ (1000+ 리뷰)</p>
        </div>
      </div>
    </>
  );
}
