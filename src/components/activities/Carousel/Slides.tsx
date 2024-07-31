import Image from 'next/image';
import { ReactNode } from 'react';

function SlideContainer({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-240 w-full items-center justify-center md:h-550">
      {children}
    </section>
  );
}

export function PaginationSlide1() {
  return (
    <SlideContainer>
      <div className="absolute inset-0 z-10 text-white">
        <div className="relative ml-24 mt-74 md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
          <h1 className="text-24 font-bold leading-28 md:text-54 md:leading-64 xl:text-68 xl:leading-80">
            함께 배우면 즐거운
            <br /> 스트릿 댄스
          </h1>
          <span className="text-bold mt-8 text-14 leading-26 md:text-20">
            8월의 인기 체험 BEST
          </span>
        </div>
      </div>
      <Image
        src="/imgs/carousel1.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </SlideContainer>
  );
}

export function PaginationSlide2() {
  return (
    <SlideContainer>
      <div className="absolute inset-0 z-10 text-white">
        <div className="relative mr-24 mt-74 text-right md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
          <h1 className="text-24 font-bold leading-28 md:text-54 md:leading-64 xl:text-68 xl:leading-80">
            위워크에서 <br />
            코딩하기
          </h1>
          <span className="text-bold mt-8 text-14 leading-26 md:text-20">
            영준님 출석 바람
          </span>
        </div>
      </div>
      <Image
        src="/imgs/carousel2.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </SlideContainer>
  );
}

export function PaginationSlide3() {
  return (
    <SlideContainer>
      <div className="absolute inset-0 z-10 text-white">
        <div className="relative ml-24 mt-74 md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
          <h1 className="text-24 font-bold leading-28 md:text-54 md:leading-64 xl:text-68 xl:leading-80">
            2024 파리 올림픽 <br />
            100배 즐기기
          </h1>
          <span className="text-bold mt-8 text-14 leading-26 md:text-20">
            올해의 체험 선정
          </span>
        </div>
      </div>
      <Image
        src="/imgs/carousel3.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </SlideContainer>
  );
}
