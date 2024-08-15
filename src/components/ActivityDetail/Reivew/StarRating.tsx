import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

export default function StarRating(props: StarRatingProps) {
  const { rating } = props;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex">
      {'★'
        .repeat(fullStars)
        .split('')
        .map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      {halfStar ? <FaStar className="text-yellow-500" /> : null}
      {'☆'
        .repeat(emptyStars)
        .split('')
        .map((_, index) => (
          <FaStar
            key={fullStars + halfStar + index}
            className="text-gray-300"
          />
        ))}
    </div>
  );
}
