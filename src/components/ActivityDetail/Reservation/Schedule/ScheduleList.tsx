import ScheduleButton from './ScheduleButton';

interface ScheduleListProps {
  selectedSchedules: { startTime: string; endTime: string; id: number }[];
  bookableIds: Set<number>;
  selectedScheduleId: number | null;
  handleScheduleClick: (
    index: number,
    schedule: { startTime: string; endTime: string; id: number },
  ) => void;
  setSelectedScheduleId: (id: number | null) => void;
}

export default function ScheduleList(props: ScheduleListProps) {
  const {
    selectedSchedules,
    bookableIds,
    setSelectedScheduleId,
    handleScheduleClick,
    selectedScheduleId,
  } = props;
  return (
    <div className="my-16 grid grid-cols-2 gap-10">
      {selectedSchedules.map((schedule, index) => {
        const isBookable = bookableIds.has(schedule.id);
        const isSelected = selectedScheduleId === schedule.id;

        return (
          <ScheduleButton
            key={index}
            schedule={schedule}
            isSelected={isSelected}
            isBookable={isBookable}
            onClick={() => {
              if (isBookable) {
                if (isSelected) {
                  setSelectedScheduleId(null);
                } else {
                  handleScheduleClick(index, schedule);
                  setSelectedScheduleId(schedule.id);
                }
              }
            }}
          />
        );
      })}
    </div>
  );
}
