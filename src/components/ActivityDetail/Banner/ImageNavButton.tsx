import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';

interface ImageNavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function ImageNavButton(props: ImageNavButtonProps) {
  const { direction, onClick } = props;

  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 transform rounded bg-custom-gray-300 px-4 py-16 opacity-50 ${direction === 'left' ? 'left-0' : 'right-0'}`}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ArrowLeft className="size-20" />
      ) : (
        <ArrowRight className="size-20" />
      )}
    </button>
  );
}
