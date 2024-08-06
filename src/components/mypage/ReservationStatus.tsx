import {
  getMyActivitiesReservationDashboard,
  getMyAllActivities,
} from '@/libs/api/myActivities';
import { DoubleArrowNext, DoubleArrowPrev } from '@/libs/utils/Icon';
import {
  Activities,
  GetMyActivitiesReservationDashboardResponse,
} from '@trip.zip-api';
import React, { useEffect, useState } from 'react';

import Calendar from './BookingCalendar/BookingCalendar';

type ActivityListItem = {
  id: number;
  title: string;
};

export default function ReservationStatus() {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const today = new Date();
  const yearNow = today.getFullYear();
  const monthNow = today.getMonth();

  const [currentYear, setCurrentYear] = useState(yearNow);
  const [currentMonth, setCurrentMonth] = useState(monthNow);

  const handleMonthPrev = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11); // 12월로 설정
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleMonthNext = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0); // 1월로 설정
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const [activityList, setActivityList] = useState<ActivityListItem[]>([]);
  const [activityId, setActivityId] = useState<number>();
  const [monthlyData, setMonthlyData] =
    useState<GetMyActivitiesReservationDashboardResponse>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getMyAllActivities();
        const activityList = response.activities.map(
          (activity: Activities) => ({
            id: activity.id,
            title: activity.title,
          }),
        );
        setActivityList(activityList);
        setActivityId(activityList[0].id);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    if (activityId === undefined) return;
    const fetchBookingStatus = async () => {
      try {
        const response = await getMyActivitiesReservationDashboard({
          activityId,
          year: currentYear.toString(),
          month: (currentMonth + 1).toString().padStart(2, '0'),
        });
        setMonthlyData(response);
      } catch (error) {
        console.error('Failed to fetch Monthly Booking Info', error);
      }
    };
    fetchBookingStatus();
  }, [activityId, currentMonth, currentYear]);

  return (
    <>
      <div className="flex h-full w-full min-w-342 flex-col gap-24">
        <section className="flex flex-col gap-32">
          <h2 className="text-32 font-bold">예약 현황</h2>
          <select
            className="h-56 w-full rounded-md border-1 border-custom-gray-700 outline-none"
            onChange={(e) => setActivityId(Number(e.target.value))}
          >
            {activityList?.map((activity, index) => (
              <option
                key={index}
                value={activity.id}
                // 첫번째 option 기본값으로 지정
                {...(index === 0 && { selected: true })}
              >
                {activity.title}
              </option>
            ))}
          </select>
        </section>
      </div>
      <div className="mb-100 mt-24 flex flex-col gap-17">
        {/* control bar */}
        <div className="flex h-42 justify-center gap-10">
          <button
            type="button"
            onClick={handleMonthPrev}
            className="outline-none hover:opacity-40"
          >
            <DoubleArrowPrev aria-label="이전 달" className="size-24" />
          </button>
          {/* todo: 연도, 날짜 드롭다운 추가 */}
          <button
            type="button"
            className="text-20 font-bold outline-none hover:opacity-40"
          >
            {currentYear}년
          </button>
          <button
            type="button"
            className="text-20 font-bold outline-none hover:opacity-40"
          >
            {currentMonth + 1}월
          </button>
          <button
            type="button"
            onClick={handleMonthNext}
            className="outline-none hover:opacity-40"
          >
            <DoubleArrowNext aria-label="다음 달" className="size-24" />
          </button>
        </div>
        <div>
          <Calendar
            currentYear={currentYear}
            currentMonth={currentMonth}
            days={days}
            monthlyData={monthlyData}
          />
        </div>
      </div>
    </>
  );
}
