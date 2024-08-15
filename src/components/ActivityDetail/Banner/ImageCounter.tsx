interface ImageCounterProps {
  currentIndex: number;
  totalImages: number;
}

export default function ImageCounter(props: ImageCounterProps) {
  const { currentIndex, totalImages } = props;

  return (
    <div className="absolute bottom-10 right-16 flex">
      <div className="rounded bg-custom-gray-700 px-8 py-2 text-custom-gray-100">
        {`${currentIndex + 1} / ${totalImages}`}
      </div>
    </div>
  );
}
