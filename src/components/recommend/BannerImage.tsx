import Image from 'next/image';

export default function BannerImage({ src }: { src: string }) {
  return (
    <div className="relative h-240 w-full">
      <Image
        src={src}
        fill
        alt="banner-image"
        className="absolute object-cover"
      />
    </div>
  );
}
