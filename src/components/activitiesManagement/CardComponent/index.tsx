import { StarOnIcon } from '@/libs/utils/Icon';
import Image from 'next/image';

interface MyCardProps {
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
}

export default function MyCard({
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  price,
}: MyCardProps) {
  return (
    <div className="w-64 overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-64 w-full">
        <Image
          src={bannerImageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="bg-gray-200"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center">
          <StarOnIcon />
          <span className="text-sm ml-1 text-gray-600">
            {rating} ({reviewCount})
          </span>
        </div>
        <h3 className="text-lg mb-2 font-semibold text-gray-800">{title}</h3>
        <p className="text-xl font-bold text-gray-900">
          ₩{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
