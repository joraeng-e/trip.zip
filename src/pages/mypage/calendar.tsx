import Dropdown from '@/components/commons/Dropdown';
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

export default function ReservationStatus() {
  const prevIcon = (
    <DoubleArrowPrev aria-label="이전 달" className="size-24 dark:invert" />
  );
  const nextIcon = (
    <DoubleArrowNext aria-label="다음 달" className="size-24 dark:invert" />
  );

  const today = new Date();
  const yearNow = today.getFullYear();
  const monthNow = today.getMonth();

  const [currentYear, setCurrentYear] = useState(yearNow);
  const [currentMonth, setCurrentMonth] = useState(monthNow);

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
              <div className="md:flex-center fixed inset-0 top-70 backdrop-blur-sm md:absolute md:top-0">
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
