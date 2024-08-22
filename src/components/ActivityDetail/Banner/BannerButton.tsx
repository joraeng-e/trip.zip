interface BannerButtonProps {
  onClick: () => void;
}

export default function BannerButton(props: BannerButtonProps) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="dark-base dark-border absolute bottom-20 right-20 h-40 w-120 rounded-3xl border border-custom-gray-400 bg-white text-md-regular transition hover:bg-custom-gray-800 hover:text-white"
    >
      사진 전체 보기
    </button>
  );
}
