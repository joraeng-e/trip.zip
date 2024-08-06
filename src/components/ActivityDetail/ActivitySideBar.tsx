import Button from '@/components/commons/Button';
import React from 'react';

interface ActivitySideBarProps {
  price: number;
}

export default function ActivitySideBar(props: ActivitySideBarProps) {
  const { price } = props;
  return (
    <div className="sticky top-100 m-16 w-auto rounded-lg border-2 border-custom-gray-400 p-16 text-nomad-black">
      <div className="my-10 text-2xl-bold">
        {price}
        <span className="text-lg-regular">/ 2인</span>
      </div>
      <Button
        variant="activeButton"
        hasICon={true}
        className="h-36 rounded-md text-md-bold"
        onClick={() => alert('Button Clicked!')}
      >
        {price} 원 / 인
      </Button>
    </div>
  );
}
