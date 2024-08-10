import {
  MinusTimeIcon,
  PlusTimeIcon,
  TimeSeparatorIcon,
} from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import {
  GetActivityDetailResponse,
  PostActivitiesRequest,
} from '@trip.zip-api';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface DateTimeProps {
  existingSchedules: GetActivityDetailResponse['schedules'];
  onScheduleRemove: (scheduleId: number) => void;
  onScheduleAdd: (
    schedule: Omit<GetActivityDetailResponse['schedules'][0], 'id'>,
  ) => void;
}

export default function EditDateTime({
  existingSchedules,
  onScheduleRemove,
  onScheduleAdd,
}: DateTimeProps) {
  const todayDate = new Date().toLocaleDateString('en-CA');
  const {
    setValue,
    trigger,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<PostActivitiesRequest>();

  const [schedules, setSchedules] = useState<
    GetActivityDetailResponse['schedules']
  >(existingSchedules || []);

  const [entry, setEntry] = useState({
    date: todayDate,
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    setValue('schedules', schedules);
  }, [schedules, setValue]);

  const handleDateTimeInputChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEntry((prevEntry) => ({ ...prevEntry, [id]: value }));
    clearErrors('schedules');
  };

  const isValidEntry = useMemo(() => {
    const { date, startTime, endTime } = entry;
    return (
      date && startTime && endTime && date >= todayDate && startTime < endTime
    );
  }, [entry, todayDate]);

  const isDuplicateEntry = (newEntry: typeof entry) => {
    return schedules.some(
      ({ date, startTime }) =>
        date === newEntry.date && startTime === newEntry.startTime,
    );
  };

  const handleAddEntry = async () => {
    if (isDuplicateEntry(entry)) {
      setError('schedules', {
        type: 'manual',
        message: '중복된 시작 시간입니다. 다른 시간을 선택해주세요.',
      });
    } else {
      const newSchedule = { ...entry };
      onScheduleAdd(newSchedule);
      setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
      setEntry({ date: todayDate, startTime: '', endTime: '' });
      await trigger('schedules');
      console.log('New schedule added:', newSchedule);
    }
  };

  const handleRemoveEntry = (scheduleId: number) => {
    onScheduleRemove(scheduleId);
    setSchedules(schedules.filter((schedule) => schedule.id !== scheduleId));
    trigger('schedules');
    console.log('Schedule removed:', scheduleId);
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-between gap-5">
        <div className="flex w-full max-w-380 flex-col">
          <label htmlFor="date" className="mb-1">
            날짜
          </label>
          <input
            id="date"
            type="date"
            className={classNames('basic-input max-w-380 cursor-pointer', {
              'border-red-500': !!errors.schedules?.message,
            })}
            value={entry.date}
            min={todayDate}
            onChange={handleDateTimeInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="startTime" className="mb-1">
            시작 시간
          </label>
          <input
            id="startTime"
            type="time"
            className={classNames('basic-input max-w-150 cursor-pointer p-10', {
              'border-red-500': !!errors.schedules?.message,
            })}
            value={entry.startTime}
            onChange={handleDateTimeInputChange}
          />
        </div>
        <div className="mt-20 hidden md:block">
          <TimeSeparatorIcon />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endTime" className="mb-1">
            종료 시간
          </label>
          <input
            id="endTime"
            type="time"
            className={classNames('basic-input max-w-150 cursor-pointer p-10', {
              'border-red-500': !!errors.schedules?.message,
            })}
            value={entry.endTime}
            onChange={handleDateTimeInputChange}
          />
        </div>
        <button
          type="button"
          onClick={handleAddEntry}
          className={classNames('mt-20 h-56 w-56 max-w-56 rounded-md', {
            'cursor-not-allowed text-gray-400': !isValidEntry,
            'text-green-700 hover:text-green-900 hover:shadow-lg':
              !!isValidEntry,
          })}
          disabled={!isValidEntry}
          aria-label="일정 추가"
        >
          <PlusTimeIcon />
        </button>
      </div>
      {errors.schedules && (
        <div className="pl-8 text-xs-regular text-custom-red-200" role="alert">
          {errors.schedules.message as string}
        </div>
      )}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center justify-between gap-5"
          >
            <input
              type="text"
              className="basic-input w-full max-w-380"
              value={schedule.date}
              readOnly
              onChange={(e) => {
                const newSchedules = schedules.map((s) =>
                  s.id === schedule.id ? { ...s, date: e.target.value } : s,
                );
                setSchedules(newSchedules);
              }}
            />
            <input
              type="text"
              className="basic-input w-full max-w-133"
              value={schedule.startTime}
              readOnly
              onChange={(e) => {
                const newSchedules = schedules.map((s) =>
                  s.id === schedule.id
                    ? { ...s, startTime: e.target.value }
                    : s,
                );
                setSchedules(newSchedules);
              }}
            />
            <div className="hidden md:block">
              <TimeSeparatorIcon />
            </div>
            <input
              type="text"
              className="basic-input w-full max-w-135"
              value={schedule.endTime}
              readOnly
              onChange={(e) => {
                const newSchedules = schedules.map((s) =>
                  s.id === schedule.id ? { ...s, endTime: e.target.value } : s,
                );
                setSchedules(newSchedules);
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveEntry(schedule.id)}
              aria-label="일정 제거"
            >
              <MinusTimeIcon className="text-white hover:text-gray-200" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
