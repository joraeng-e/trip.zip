import React, { useCallback, useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

type RatingProps = {
  starSize: number;
  onClick: (rating: number) => void;
};

const StarIcon = React.memo(
  ({ starSize, isFilled }: { starSize: number; isFilled: boolean }) => {
    const Icon = isFilled ? FaStar : FaRegStar;
    return <Icon size={starSize} className="text-yellow-500" />;
  },
);

StarIcon.displayName = 'StarIcon';

const Rating: React.FC<RatingProps> = ({ starSize, onClick }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClickStar = useCallback(
    (star: number) => {
      setRating(star);
      onClick(star);
    },
    [onClick],
  );

  const getStarStatus = (star: number) => {
    return hoverRating >= star || rating >= star;
  };

  const starIcons = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleClickStar(star)}
          className="focus:outline-none"
        >
          <StarIcon starSize={starSize} isFilled={getStarStatus(star)} />
        </button>
      )),
    [hoverRating, rating, starSize, handleClickStar],
  );

  return <div className="flex">{starIcons}</div>;
};

export default Rating;
