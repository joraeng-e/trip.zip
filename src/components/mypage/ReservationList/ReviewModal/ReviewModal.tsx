import { XIcon } from '@/libs/utils/Icon';
import { Reservation } from '@trip.zip-api';

import Rating from './Rating';

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
};

export default function ReviewModal({
  isOpen,
  onClose,
  reservation,
}: ReviewModalProps) {
  console.log(reservation);
  return (
    isOpen && (
      <div className="flex-center fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm">
        <div className="flex h-full w-full flex-col gap-35 overflow-y-auto border-custom-gray-300 bg-white px-24 py-35 pb-30 shadow-lg md:rounded-lg md:border-1 lg:h-697 lg:w-429">
          <div className="flex items-center justify-between">
            <span className="text-28 font-bold text-custom-black">
              후기작성
            </span>
            <button type="button" onClick={() => onClose}>
              <XIcon className="size-48" />
            </button>
          </div>
          <form className="flex h-full flex-col gap-12">
            <div className="flex gap-8">
              <div className="size-100 rounded-xl bg-red-400">이미지</div>
              <div className="flex flex-col gap-6">
                <span className="text-16 font-bold text-nomad-black">
                  {reservation.activity.title}
                </span>
                <span className="text-14 font-normal text-nomad-black">
                  {reservation.date} / {reservation.startTime}-
                  {reservation.endTime} / {reservation.headCount}명
                </span>
                <hr />
                <span className="text-20 font-bold text-nomad-black">
                  ₩ {reservation.totalPrice}
                </span>
              </div>
            </div>
            <div className="flex-center h-100 w-full">
              <Rating starSize={50} />
            </div>
            <textarea className="h-full flex-1 border-1 border-custom-gray-700" />
            <button className="mt-12 h-54 bg-red-300" type="submit">
              작성하기
            </button>
          </form>
        </div>
      </div>
    )
  );
}
