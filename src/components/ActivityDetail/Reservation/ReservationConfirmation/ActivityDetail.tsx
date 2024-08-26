import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ActivityDetailProps {
  detailData: {
    bannerImageUrl: string;
    title: string;
    address: string;
    rating: number;
    price: number;
  };
}

export default function ActivityDetail(props: ActivityDetailProps) {
  const { detailData } = props;
  return (
    <div className="dark-base dark-border mt-20 rounded-lg bg-white shadow-lg">
      <div className="flex">
        <div className="relative mr-4 h-200 w-200">
          <Image
            src={detailData.bannerImageUrl}
            alt={detailData.title}
            fill
            className="rounded-l-md"
          />
        </div>

        <div className="relative mx-20 my-14 flex-1 p-4">
          <h3 className="text-xl-bold">{detailData.title}</h3>
          <p className="mt-6 text-md-semibold text-custom-gray-700">
            {detailData.address}
          </p>
          <div className="mt-10 flex items-center">
            <FaStar className="mb-0 text-yellow-500" />
            <span className="ml-4 text-md-regular">{detailData.rating}</span>
          </div>
          <p className="absolute bottom-0 right-0 text-2xl-semibold">
            {detailData.price.toLocaleString()} 원
          </p>
        </div>
      </div>
    </div>
  );
}
