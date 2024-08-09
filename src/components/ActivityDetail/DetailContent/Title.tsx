import { KebabIcon } from '@/libs/utils/Icon';
import { LocationIcon } from '@/libs/utils/Icon';
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface TitleProps {
  title: string;
  address: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export default function Title(props: TitleProps) {
  const { title, address, category, rating, reviewCount } = props;

  const handleClickClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('주소가 클립보드에 복사되었습니다!');
    });
  };

  return (
    <div className="mx-16 mt-16 flex-col">
      <div className="text-md-regular text-nomad-black">{category}</div>
      <div className="mb-16 mt-10 flex items-center justify-between text-2xl-bold text-nomad-black">
        {title} <KebabIcon className="" />
      </div>
      <div className="flex gap-12 text-md-regular text-custom-black">
        <FaStar className="mt-4 text-yellow-500" />
        {rating}({reviewCount})
        <div
          className="flex cursor-pointer items-center gap-12"
          onClick={handleClickClipboard}
        >
          <LocationIcon />
          <div>{address}</div>
        </div>
      </div>
    </div>
  );
}
