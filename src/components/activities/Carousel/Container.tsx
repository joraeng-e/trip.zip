import Carousel from '@/components/commons/Carousel';
import Image from 'next/image';

export default function CarouselContainer() {
  return (
    <Carousel.Root autoPlay={false}>
      <Carousel.Slide>
        <Slide1 />
      </Carousel.Slide>
      <Carousel.Slide>
        <Slide2 />
      </Carousel.Slide>

      <Carousel.Navigator>
        {(prev, next) => (
          <div className="absolute left-1/2 top-1/2 z-10">
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
          </div>
        )}
      </Carousel.Navigator>
      <Carousel.Indicator />
    </Carousel.Root>
  );
}

function Slide1() {
  return (
    <>
      <div className="absolute inset-0 z-10 text-white">
        <div className="ml-24 mt-74 md:ml-32 md:mt-144 xl:mx-auto xl:mt-160 xl:w-1200">
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
    </>
  );
}

function Slide2() {
  return (
    <div className="relative size-full bg-red-500">
      <h1 className="mt-20">hello</h1>
    </div>
  );
}
