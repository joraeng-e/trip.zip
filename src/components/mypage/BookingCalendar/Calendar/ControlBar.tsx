import { ReactNode } from 'react';

type ControlBarProps = {
  onPrev: () => void;
  onNext: () => void;
  year: number;
  month: number;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};

export default function ControlBar({
  onPrev,
  onNext,
  year,
  month,
  prevIcon,
  nextIcon,
}: ControlBarProps) {
  return (
    <div className="flex h-42 w-full justify-center gap-17">
      <button
        type="button"
        onClick={onPrev}
        className="outline-none hover:opacity-40"
      >
        {prevIcon ? prevIcon : '<'}
      </button>
      {/* todo: 연도, 날짜 드롭다운 추가 */}
      <button
        type="button"
        className="text-20 font-bold outline-none hover:opacity-40"
      >
        {year}년
      </button>
      <button
        type="button"
        className="text-20 font-bold outline-none hover:opacity-40"
      >
        {month + 1}월
      </button>
      <button
        type="button"
        onClick={onNext}
        className="outline-none hover:opacity-40"
      >
        {nextIcon ? nextIcon : '>'}
      </button>
    </div>
  );
}
