import React from 'react';

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div>
      <div>{description}</div>
    </div>
  );
}
