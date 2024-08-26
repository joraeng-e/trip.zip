import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  src: string;
}

export default function BannerImage({ src, children }: Props) {
  return (
    <div className="relative mb-60 h-240 w-full md:mb-120 md:h-480">
      <Image
        src={src}
        fill
        alt="banner-image"
        className="absolute object-cover brightness-50 filter"
      />
      {children}
    </div>
  );
}
