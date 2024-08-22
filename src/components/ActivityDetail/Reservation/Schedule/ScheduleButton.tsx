interface ScheduleButtonProps {
  schedule: { startTime: string; endTime: string; id: number };
  isSelected: boolean;
  isBookable: boolean;
  onClick: () => void;
}

export default function ScheduleButton(props: ScheduleButtonProps) {
  const { schedule, isSelected, isBookable, onClick } = props;
  return (
    <button
      className={`min-x-100 max-x-140 h-40 w-full rounded-md border text-md-regular hover:bg-custom-gray-300 dark:bg-custom-black dark:text-white ${
        isSelected
          ? 'bg-custom-active tran bg-custom-green-200 text-white hover:bg-custom-green-200 dark:bg-white dark:text-custom-black'
          : isBookable
            ? 'text-custom-black'
            : 'cursor-not-allowed bg-custom-gray-200 text-custom-gray-700 line-through hover:bg-custom-gray-200 dark:border-custom-gray-800 dark:bg-custom-gray-800 dark:text-custom-gray-500'
      }`}
      onClick={onClick}
      disabled={!isBookable}
    >
      {schedule.startTime} ~ {schedule.endTime}
    </button>
  );
}
