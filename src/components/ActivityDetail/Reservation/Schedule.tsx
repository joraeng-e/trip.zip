import Button from '@/components/commons/Button';

interface ScheduleProps {
  selectedSchedules: { startTime: string; endTime: string }[];
  activeIndex: number | null;
  handleButtonClick: (
    index: number,
    schedule: { startTime: string; endTime: string },
  ) => void;
}

export default function Schedule(props: ScheduleProps) {
  const { selectedSchedules, activeIndex, handleButtonClick } = props;
  return (
    <>
      <hr className="contour mx-0" />
      <div className="text-lg-bold text-nomad-black">예약 가능 시간</div>
      <div className="my-16 grid grid-cols-2 gap-10">
        {selectedSchedules.map((schedule, index) => (
          <button
            key={index}
            className={`min-x-100 max-x-140 h-40 w-full rounded-md border text-md-regular hover:bg-custom-gray-300 ${activeIndex === index ? 'bg-custom-active tran bg-custom-green-200 text-white hover:bg-custom-green-200' : 'text-custom-black'}`}
            onClick={() => handleButtonClick(index, schedule)}
          >
            {schedule.startTime} ~ {schedule.endTime}
          </button>
        ))}
      </div>
      <Button
        variant="activeButton"
        className="mt-4 h-36 rounded-md text-md-bold"
        onClick={() => alert('Button Clicked!')}
      >
        예약하기
      </Button>
    </>
  );
}
