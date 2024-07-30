import { MinusTimeIcon, PlusTimeIcon } from '@/libs/utils/Icon';
import { useEffect, useState } from 'react';

interface DateTimeInput {
  date: string;
  startTime: string;
  endTime: string;
}

interface DateTimeProps {
  onChange: (schedules: DateTimeInput[]) => void;
}

export default function DateTime({ onChange }: DateTimeProps) {
  const [todayDate, setTodayDate] = useState<string>('');
  const [entries, setEntries] = useState<DateTimeInput[]>([]);
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTodayDate(today);
    setDate(today);
  }, []);

  useEffect(() => {
    onChange(entries);
  }, [entries]);

  const handleAddEntry = () => {
    setEntries([...entries, { date, startTime, endTime }]);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  return (
    <div>
      <div className="flex w-full items-center gap-5 [&>div]:flex [&>div]:flex-col">
        <div>
          <label htmlFor="date">날짜</label>
          <input
            id="date"
            type="date"
            className="basic-input max-w-380"
            value={date}
            min={todayDate}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startTime">시작 시간</label>
          <input
            id="startTime"
            type="time"
            className="basic-input max-w-140"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endTime">종료 시간</label>
          <input
            id="endTime"
            type="time"
            className="basic-input max-w-140"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddEntry} className="mt-23">
          <PlusTimeIcon />
        </button>
      </div>
      <div>
        {entries.map((entry, index) => (
          <div key={index} className="flex gap-5 [&>div]:flex [&>div]:flex-col">
            <div>
              <input
                type="text"
                value={entry.date}
                readOnly
                className="basic-input max-w-380"
              />
            </div>
            <div>
              <input
                type="text"
                value={entry.startTime}
                readOnly
                className="basic-input max-w-140"
              />
            </div>
            <div>
              <input
                type="text"
                value={entry.endTime}
                readOnly
                className="basic-input max-w-140"
              />
            </div>
            <button onClick={() => handleRemoveEntry(index)}>
              <MinusTimeIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
