import {
  MinusTimeIcon,
  PlusTimeIcon,
  TimeSeparatorIcon,
} from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import type { DateTimeInput } from '@/types/datetype';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Schedule extends DateTimeInput {
  id: number;
}

interface DateTimeProps {
  isEditMode?: boolean;
  existingSchedules?: Schedule[];
  onScheduleRemove?: (scheduleId: number) => void;
  onScheduleAdd?: (schedule: DateTimeInput) => void;
}

export default function DateTime({
  isEditMode = false,
  existingSchedules = [],
  onScheduleRemove,
  onScheduleAdd,
}: DateTimeProps) {
  const todayDate = new Date().toLocaleDateString('en-CA');
  const {
    formState: { errors },
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useFormContext();
  const [schedules, setSchedules] = useState<Schedule[]>(existingSchedules);
  const [entry, setEntry] = useState<DateTimeInput>({
    date: todayDate,
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (existingSchedules.length > 0) {
      setSchedules(existingSchedules);
      setValue('schedules', existingSchedules);
    }
  }, [existingSchedules, setValue]);

  const handleDateTimeInputChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEntry((prevEntry) => ({ ...prevEntry, [id]: value }));
    clearErrors('schedules');
  };

  const isValidEntry = useMemo(() => {
    const { date, startTime, endTime } = entry;
    return date && startTime && endTime && date >= todayDate;
  }, [entry, todayDate]);

  const isDuplicateEntry = (newEntry: DateTimeInput) => {
    return schedules.some(
      ({ date, startTime }) =>
        date === newEntry.date && startTime === newEntry.startTime,
    );
  };

  const setScheduleError = (message: string) => {
    setError('schedules', { type: 'manual', message });
  };

  const updateSchedules = (newSchedule: Schedule) => {
    setSchedules((prev) => [...prev, newSchedule]);
    setValue('schedules', [...schedules, newSchedule]);
  };

  const handleAddEntry = async () => {
    if (!isValidEntry) return;

    if (isDuplicateEntry(entry)) {
      setScheduleError('중복된 시작 시간입니다. 다른 시간을 선택해주세요.');
      return;
    }

    if (entry.startTime >= entry.endTime) {
      setScheduleError('시작 시간은 종료 시간보다 빨라야 합니다.');
      return;
    }

    const newSchedule: Schedule = { ...entry, id: Date.now() };

    if (isEditMode && onScheduleAdd) {
      onScheduleAdd(entry);
    }

    updateSchedules(newSchedule);
    setEntry({ date: todayDate, startTime: '', endTime: '' });
    await trigger('schedules');
  };

  const handleRemoveEntry = (scheduleId: number) => {
    if (isEditMode && onScheduleRemove) {
      onScheduleRemove(scheduleId);
    }

    const updatedSchedules = schedules.filter(
      (schedule) => schedule.id !== scheduleId,
    );
    setSchedules(updatedSchedules);
    setValue('schedules', updatedSchedules);
    trigger('schedules');
  };

  return (
    <div className="space-y-4">
      <div className="flex max-w-792 items-center justify-between gap-5">
        <div className="flex w-full min-w-50 max-w-380 flex-col">
          <label htmlFor="date" className="mb-1">
            날짜
          </label>
          <input
            id="date"
            type="date"
            className={classNames(
              'dark-base basic-input max-w-380 cursor-pointer',
              {
                'border-red-500': !!errors.schedules?.message,
              },
            )}
            value={entry.date}
            min={todayDate}
            onChange={handleDateTimeInputChange}
          />
        </div>
        <div className="flex min-w-50 flex-col">
          <label htmlFor="startTime" className="mb-1 whitespace-nowrap">
            시작 시간
          </label>
          <input
            id="startTime"
            type="time"
            className={classNames(
              'dark-base basic-input max-w-150 cursor-pointer p-10',
              {
                'border-red-500': !!errors.schedules?.message,
              },
            )}
            value={entry.startTime}
            onChange={handleDateTimeInputChange}
          />
        </div>
        <div className="mt-20 hidden md:block">
          <TimeSeparatorIcon className="fill-custom-gray-400 dark:fill-white" />
        </div>
        <div className="flex min-w-50 flex-col">
          <label htmlFor="endTime" className="mb-1 whitespace-nowrap">
            종료 시간
          </label>
          <input
            id="endTime"
            type="time"
            className={classNames(
              'dark-base basic-input max-w-150 cursor-pointer p-10',
              {
                'border-red-500': !!errors.schedules?.message,
              },
            )}
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
            className="flex max-w-792 items-center justify-between gap-5"
          >
            <input
              type="text"
              readOnly
              className="dark-base basic-input w-full max-w-380"
              value={schedule.date}
            />
            <input
              type="text"
              readOnly
              className="dark-base basic-input w-full max-w-136"
              value={schedule.startTime}
            />
            <div className="hidden md:block">
              <TimeSeparatorIcon className="fill-custom-gray-400 dark:fill-white" />
            </div>
            <input
              type="text"
              readOnly
              className="dark-base basic-input w-full max-w-136"
              value={schedule.endTime}
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
