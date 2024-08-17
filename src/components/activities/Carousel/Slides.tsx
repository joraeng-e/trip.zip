import { Bagel_Fat_One, Gowun_Batang, Gugi } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const gowunBatang = Gowun_Batang({ weight: '700', subsets: ['latin'] });
const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });
const gugi = Gugi({ weight: '400', subsets: ['latin'] });

export function SummerSlide() {
  return (
    <>
      <div className="ml-20 mt-64 text-white md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
        <h1
          className={`text-24 font-bold leading-28 md:text-54 md:leading-64 xl:text-68 xl:leading-80 ${bagelFatOne.className}`}
        >
          여름휴가.zip
        </h1>
        <div className="text-bold mt-8 flex flex-col text-14 md:text-20">
          <span>무더운 여름</span>
          <span className="-mt-6 md:-mt-4">시원한 여행 패키지</span>
        </div>
        <Link
          href="/recommend/summer"
          className="mt-4 block w-fit rounded-xl bg-custom-gray-200 px-12 py-6 text-12 text-nomad-black hover:bg-custom-gray-300 md:mt-20 md:rounded-2xl md:px-20 md:text-16"
        >
          체험 보러가기 &#8594;
        </Link>
      </div>
      <Image
        src="/imgs/carousel/summer.png"
        alt="carousel"
        fill
        priority
        className="-z-10 object-cover"
      />
    </>
  );
}

export function SeoulSlide() {
  return (
    <>
      <div className="mr-20 mt-64 text-right text-white md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
        <h1
          className={`text-24 font-bold leading-28 md:text-54 md:leading-64 xl:text-68 xl:leading-80 ${gugi.className}`}
        >
          서울 나들이.zip
        </h1>
        <span
          className={`text-bold mt-8 block text-14 leading-26 md:text-20 ${gugi.className}`}
        >
          서울 방방곡곡
        </span>
        <div className="flex justify-end">
          <Link
            href="/recommend/seoul"
            className="mt-4 block w-fit rounded-xl bg-custom-gray-200 px-12 py-6 text-12 text-nomad-black hover:bg-custom-gray-300 md:mt-20 md:rounded-2xl md:px-20 md:text-16"
          >
            체험 보러가기 &#8594;
          </Link>
        </div>
      </div>
      <Image
        src="/imgs/carousel/seoul.png"
        alt="carousel"
        fill
        priority
        className="-z-10 object-cover"
      />
    </>
  );
}

export function FoodTourSlide() {
  return (
    <>
      <div className="ml-20 mt-64 text-white md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
        <h1
          className={`text-24 font-bold leading-28 md:text-54 md:leading-64 xl:text-68 xl:leading-80 ${gowunBatang.className}`}
        >
          맛.zip
        </h1>
        <span
          className={`text-bold mt-8 block text-14 leading-26 md:text-20 ${gowunBatang.className}`}
        >
          어머 이건 찍어야 돼
        </span>
        <Link
          href="/recommend/food-tour"
          className="mt-4 block w-fit rounded-xl bg-custom-gray-200 px-12 py-6 text-12 text-nomad-black hover:bg-custom-gray-300 md:mt-20 md:rounded-2xl md:px-20 md:text-16"
        >
          체험 보러가기 &#8594;
        </Link>
      </div>
      <Image
        src="/imgs/carousel/steak.png"
        alt="carousel"
        fill
        priority
        className="-z-10 object-cover"
      />
    </>
  );
}
