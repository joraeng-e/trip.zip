import { FaStar } from 'react-icons/fa';

interface RatingProps {
  rating: number;
  reviewCount: number;
}

export default function Rating(props: RatingProps) {
  const { rating, reviewCount } = props;
  return (
    <div className="flex gap-10 text-md-regular text-custom-black dark:text-white">
      <FaStar className="mt-4 text-yellow-500" />
      {rating}({reviewCount})
    </div>
  );
}
