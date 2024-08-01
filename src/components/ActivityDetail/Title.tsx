import { KebabIcon } from '@/libs/utils/Icon';
import { LocationIcon } from '@/libs/utils/Icon';
import React from 'react';

interface TitleProps {
  title: string;
  address: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export default function Title(props: TitleProps) {
  const { title, address, category, rating, reviewCount } = props;

  return (
    <div className="mx-16 mt-16 flex-col">
      <div className="text-md-regular text-nomad-black">{category}</div>
      <div className="mb-16 mt-10 flex items-center justify-between text-2xl-bold text-nomad-black">
        {title} <KebabIcon className="" />
      </div>
      <div className="flex items-center gap-12 text-md-regular text-custom-black">
        ⭐{rating}({reviewCount})
        <LocationIcon />
        <div>{address}</div>
      </div>
    </div>
  );
}
