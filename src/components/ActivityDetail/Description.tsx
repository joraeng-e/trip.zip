import React from 'react';

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div className="m-16">
      <h2 className="text-xl-bold text-nomad-black">체험 설명</h2>
      <div className="text-lg-regular text-nomad-black">{description}</div>
    </div>
  );
}
