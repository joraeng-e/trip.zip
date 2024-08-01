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
    <div>
      <div className="">{category}</div>
      <div>{title}</div>
      <div>
        {rating}({reviewCount})
      </div>
      <div>{address}</div>
    </div>
  );
}
