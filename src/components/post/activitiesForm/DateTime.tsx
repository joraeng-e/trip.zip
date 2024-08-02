import {
  MinusTimeIcon,
  PlusTimeIcon,
  TimeSeparatorIcon,
} from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import { PostActivitiesRequest } from '@trip.zip-api';
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface DateTimeInput {
  date: string;
  startTime: string;
  endTime: string;
}

export default function DateTime() {
  const [todayDate, setTodayDate] = useState<string>('');
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<PostActivitiesRequest>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  const [entry, setEntry] = useState<DateTimeInput>({
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTodayDate(today);
    setEntry((prevEntry) => ({ ...prevEntry, date: today }));
  }, []);

  const handleChange = ({
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

  const isDuplicateEntry = (newEntry: DateTimeInput) => {
    return getValues('schedules').some(
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
      append(entry);
      setEntry({ date: todayDate, startTime: '', endTime: '' });
      await trigger('schedules');
    }
  };

  const handleRemoveEntry = (index: number) => {
    remove(index);
    trigger('schedules');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-5">
        <div className="flex w-full flex-col">
          <label htmlFor="date" className="mb-1">
            날짜
          </label>
          <input
            id="date"
            type="date"
            className={classNames('basic-input max-w-380', {
              'border-red-500': !!errors.schedules?.message,
            })}
            value={entry.date}
            min={todayDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="startTime" className="mb-1">
            시작 시간
          </label>
          <input
            id="startTime"
            type="time"
            className={classNames('basic-input max-w-140', {
              'border-red-500': !!errors.schedules?.message,
            })}
            value={entry.startTime}
            onChange={handleChange}
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
            className={classNames('basic-input max-w-140', {
              'border-red-500': !!errors.schedules?.message,
            })}
            value={entry.endTime}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          onClick={handleAddEntry}
          className={classNames('mt-6', {
            'cursor-not-allowed opacity-50': !isValidEntry,
            'text-green-800 hover:text-nomad-black': !!isValidEntry,
          })}
          disabled={!isValidEntry}
          aria-label="일정 추가"
        >
          <PlusTimeIcon className="mt-18 text-green-800 hover:text-nomad-black" />
        </button>
      </div>
      {errors.schedules && (
        <div className="pl-8 text-xs-regular text-custom-red-200" role="alert">
          {errors.schedules.message as string}
        </div>
      )}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-5">
            <input
              type="text"
              readOnly
              className="basic-input w-full max-w-380"
              {...register(`schedules.${index}.date` as const)}
            />
            <input
              type="text"
              readOnly
              className="basic-input w-full max-w-140"
              {...register(`schedules.${index}.startTime` as const)}
            />
            <div className="hidden md:block">
              <TimeSeparatorIcon />
            </div>
            <input
              type="text"
              readOnly
              className="basic-input w-full max-w-140"
              {...register(`schedules.${index}.endTime` as const)}
            />
            <button
              type="button"
              onClick={() => handleRemoveEntry(index)}
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
