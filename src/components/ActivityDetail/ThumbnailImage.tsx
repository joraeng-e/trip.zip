import Image from 'next/image';

interface ThumbnailImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export default function ThumbnailImage(props: ThumbnailImageProps) {
  const { src, alt, onClick } = props;
  return (
    <div className="relative h-60 w-60 cursor-pointer" onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        className="rounded-lg object-cover"
      />
    </div>
  );
}
