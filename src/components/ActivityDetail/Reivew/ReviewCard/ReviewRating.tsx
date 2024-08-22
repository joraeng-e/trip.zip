import StarRating from '../StarRating';

interface ReviewRatingProps {
  rating: number;
}

export default function ReviewRating(props: ReviewRatingProps) {
  const { rating } = props;
  return (
    <div className="relative my-10 flex items-center gap-12">
      <StarRating rating={rating} />
      <div className="text-lg-regular text-custom-gray-700">{rating}</div>
    </div>
  );
}
