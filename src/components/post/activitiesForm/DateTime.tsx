import { MinusTimeIcon, PlusTimeIcon } from '@/libs/utils/Icon';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEntry((prevEntry) => ({ ...prevEntry, [id]: value }));
    clearErrors('schedules');
  };

  const isValidEntry = useMemo(() => {
    if (!entry.date || !entry.startTime || !entry.endTime) return false;
    if (entry.date < todayDate) return false;
    if (entry.startTime >= entry.endTime) return false;
    return true;
  }, [entry, todayDate]);

  const isDuplicateEntry = (newEntry: DateTimeInput) => {
    const existingEntries = getValues('schedules');
    return existingEntries.some(
      (existingEntry: DateTimeInput) =>
        existingEntry.date === newEntry.date &&
        existingEntry.startTime === newEntry.startTime,
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
            className="basic-input max-w-380"
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
            className="basic-input max-w-140"
            value={entry.startTime}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endTime" className="mb-1">
            종료 시간
          </label>
          <input
            id="endTime"
            type="time"
            className="basic-input max-w-140"
            value={entry.endTime}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          onClick={handleAddEntry}
          className={classNames('mt-6', {
            'cursor-not-allowed opacity-50': !isValidEntry,
            'text-green-800 hover:text-nomad-black': isValidEntry,
          })}
          disabled={!isValidEntry}
          aria-label="일정 추가"
        >
          <PlusTimeIcon className="mt-18 text-green-800 hover:text-nomad-black" />
        </button>
      </div>
      {errors.schedules && typeof errors.schedules.message === 'string' && (
        <div className="pl-8 text-xs-regular text-custom-red-200" role="alert">
          {errors.schedules.message}
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
