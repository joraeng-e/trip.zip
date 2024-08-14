import React, { useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

type RatingProps = {
  starSize: number;
  onClick: (rating: number) => void;
};

export default function Rating({ starSize, onClick }: RatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const getStarIcon = (star: number) => {
    if (hoverRating >= star || (!hoverRating && rating >= star)) {
      return <FaStar size={starSize} className="text-yellow-500" />;
    } else if (hoverRating + 0.5 === star || rating + 0.5 === star) {
      return <FaStarHalfAlt size={starSize} className="text-yellow-500" />;
    } else {
      return <FaRegStar size={starSize} className="text-yellow-500" />;
    }
  };

  const handleClickStar = (star: number) => {
    setRating(star);
    onClick(star);
  };

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleClickStar(star)}
          className="focus:outline-none"
        >
          {getStarIcon(star)}
        </button>
      ))}
    </div>
  );
}
