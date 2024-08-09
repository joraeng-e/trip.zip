import Image from 'next/image';

interface BlurBannerImageProps {
  src: string;
  alt: string;
}

export default function BlurBannerImage(props: BlurBannerImageProps) {
  const { src, alt } = props;

  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="absolute -z-10 rounded-lg object-cover blur-md filter"
      />
      <Image
        src={src}
        alt={alt}
        layout="fill"
        className="rounded-lg object-contain"
      />
    </div>
  );
}
