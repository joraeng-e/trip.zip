import Dropdown from '@/components/commons/Dropdown';
import { notify } from '@/components/commons/Toast';
import BookingDetailModal from '@/components/mypage/BookingCalendar/BookingDetailModal.tsx/BookingDetailModal';
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

import Calendar from '../../components/mypage/BookingCalendar/Calendar';

type ActivityListItem = {
  id: number;
  title: string;
};

const TODAY = new Date();
const YEAR_NOW = TODAY.getFullYear();
const MONTH_NOW = TODAY.getMonth();

export default function ReservationStatus() {
  const prevIcon = (
    <DoubleArrowPrev aria-label="이전 달" className="size-24 dark:invert" />
  );
  const nextIcon = (
    <DoubleArrowNext aria-label="다음 달" className="size-24 dark:invert" />
  );

  const [currentYear, setCurrentYear] = useState(YEAR_NOW);
  const [currentMonth, setCurrentMonth] = useState(MONTH_NOW);

  const [activityList, setActivityList] = useState<ActivityListItem[]>([]);
  const [activityId, setActivityId] = useState<number>(0);
  const [activityTitle, setActivityTitle] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const [monthlyData, setMonthlyData] =
    useState<GetMyActivitiesReservationDashboardResponse>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getMyAllActivities();
        const temp = response.activities || [];
        const activityList = temp.map((activity: Activities) => ({
          id: activity.id,
          title: activity.title,
        }));
        setActivityList(Array.isArray(temp) && temp.length ? activityList : []);
        setActivityId(activityList[0].id);
        setActivityTitle(activityList[0].title);
      } catch (error) {
        notify('error', '활동을 불러오는데 실패했습니다.');
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
      notify('error', '예약정보를 불러오는데 실패했습니다.');
    }
  };
  useEffect(() => {
    fetchBookingStatus();
  }, [activityId, currentYear, currentMonth]);

  useEffect(() => {
    const selectedActivity = activityList.find(
      (activity) => activity.title === activityTitle,
    );
    if (selectedActivity) {
      setActivityId(selectedActivity.id);
    }
  }, [activityTitle, activityList]);

  // 날짜 별 예약정보 리스트업
  const bookingMap = new Map<string, Record<string, string>>();

  monthlyData.forEach((booking) => {
    const transformedReservations = {
      completed: String(booking.reservations.completed),
      confirmed: String(booking.reservations.confirmed),
      pending: String(booking.reservations.pending),
    };

    bookingMap.set(booking.date, transformedReservations);
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate('');
    fetchBookingStatus();
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <MyPageLayout>
      <h1 className="mb-24 text-3xl-bold">예약 현황</h1>
      {activityList.length > 0 ? (
        <>
          <div className="flex h-full w-full min-w-342 flex-col gap-24">
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
          </div>
          <div className="mb-100 mt-24 md:relative">
            <Calendar
              year={currentYear}
              month={currentMonth}
              onChangeYear={setCurrentYear}
              onChangeMonth={setCurrentMonth}
              dayFormat={'eng'}
              dataMap={bookingMap}
              prevIcon={prevIcon}
              nextIcon={nextIcon}
              onClickDate={handleDateClick}
            />
            {isModalOpen && (
              <div className="md:flex-center fixed inset-0 top-50 backdrop-blur-sm md:absolute md:top-0">
                <BookingDetailModal
                  activityId={activityId}
                  date={selectedDate}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <NoActivity />
      )}
    </MyPageLayout>
  );
}

// ${isModalOpen ? 'border-custom-gray-100' : 'border-custom-gray-400'}
