import {
  MinusTimeIcon,
  PlusTimeIcon,
  TimeSeparatorIcon,
} from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import { PostActivitiesRequest } from '@trip.zip-api';
import { useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface DateTimeInput {
  date: string;
  startTime: string;
  endTime: string;
}

export default function DateTime() {
  const todayDate = new Date().toLocaleDateString('en-CA');

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
    date: todayDate,
    startTime: '',
    endTime: '',
  });

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
      <div className="flex max-w-792 flex-wrap items-center justify-between gap-5">
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
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex max-w-792 items-center justify-between gap-5"
          >
            <input
              type="text"
              readOnly
              className="basic-input w-full max-w-380"
              {...register(`schedules.${index}.date` as const)}
            />
            <input
              type="text"
              readOnly
              className="basic-input w-full max-w-136"
              {...register(`schedules.${index}.startTime` as const)}
            />
            <div className="hidden md:block">
              <TimeSeparatorIcon />
            </div>
            <input
              type="text"
              readOnly
              className="basic-input w-full max-w-136"
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
