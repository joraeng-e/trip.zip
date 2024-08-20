import Dropdown from '@/components/commons/Dropdown';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import NoActivity from '@/components/mypage/NoActivity';
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

import Calendar from '../../components/mypage/BookingCalendar/BookingCalendar';

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
  const [activityId, setActivityId] = useState<number>(0);
  const [activityTitle, setActivityTitle] = useState<string>('');

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
        setActivityTitle(activityList[0].title);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };
    fetchActivities();
  }, []);

  const fetchBookingStatus = async () => {
    if (activityId === 0) return;
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
  useEffect(() => {
    fetchBookingStatus();
  }, [activityId, currentMonth, currentYear]);

  useEffect(() => {
    const selectedActivity = activityList.find(
      (activity) => activity.title === activityTitle,
    );
    if (selectedActivity) {
      setActivityId(selectedActivity.id);
    }
  }, [activityTitle, activityList]);

  return (
    <MyPageLayout>
      <h1 className="mb-24 text-3xl-bold">예약 현황</h1>
      {activityList.length > 0 ? (
        <>
          <div className="flex h-full w-full min-w-342 flex-col gap-24">
            <section className="flex flex-col gap-32">
              <Dropdown
                selected={activityTitle}
                setSelected={setActivityTitle}
                maxWidth={792}
                height={56}
              >
                <Dropdown.Button
                  className="basic-input flex w-full items-center justify-between"
                  showArrow={true}
                >
                  {activityTitle}
                </Dropdown.Button>
                <Dropdown.Body>
                  {activityList?.map((activity, index) => (
                    <Dropdown.Item
                      key={index}
                      value={activity.title}
                      // 첫번째 option 기본값으로 지정
                      {...(index === 0 && { selected: true })}
                    >
                      {activity.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Body>
              </Dropdown>
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
            <div className="relative">
              <Calendar
                currentYear={currentYear}
                currentMonth={currentMonth}
                days={days}
                monthlyData={monthlyData}
                activityId={activityId}
                onRefresh={fetchBookingStatus}
              />
            </div>
          </div>
        </>
      ) : (
        <NoActivity />
      )}
    </MyPageLayout>
  );
}
