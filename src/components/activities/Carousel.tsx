import Image from 'next/image';

export default function Carousel() {
  return (
    <div className="relative h-240 w-full md:h-550">
      <Image
        src="/imgs/carousel.png"
        alt="carousel"
        fill
        className="object-cover"
      />
    </div>
  );
}
