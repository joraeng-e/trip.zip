import { MinusTimeIcon, PlusTimeIcon } from '@/libs/utils/Icon';
import { useEffect, useState } from 'react';

interface DateTimeInput {
  date: string;
  startTime: string;
  endTime: string;
}

export default function DateTime() {
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
            className="basic-input w-full min-w-[130px] max-w-[380px]"
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
            className="basic-input w-full min-w-[80px] max-w-[140px]"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endTime">종료 시간</label>
          <input
            id="endTime"
            type="time"
            className="basic-input w-full min-w-[80px] max-w-[140px]"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddEntry} className="mt-23">
          <PlusTimeIcon className="text-green-800 hover:text-nomad-black" />
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
                className="basic-input w-full min-w-[130px] max-w-[380px]"
              />
            </div>
            <div>
              <input
                type="text"
                value={entry.startTime}
                readOnly
                className="basic-input w-full min-w-[80px] max-w-[140px]"
              />
            </div>
            <div>
              <input
                type="text"
                value={entry.endTime}
                readOnly
                className="basic-input w-full min-w-[80px] max-w-[140px]"
              />
            </div>
            <button onClick={() => handleRemoveEntry(index)}>
              <MinusTimeIcon className="text-white hover:text-gray-200" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
