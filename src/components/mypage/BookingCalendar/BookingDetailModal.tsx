import Button from '@/components/commons/Button';
import Dropdown from '@/components/commons/Dropdown';
import useDeviceState from '@/hooks/useDeviceState';
import {
  getMyActivitiesReservations,
  getMyActivitiesReservedSchedule,
  patchMyActivitiesReservation,
} from '@/libs/api/myActivities';
import { PaperPlaneIcon, XIcon } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type BookingDetailModalProps = {
  activityId: number;
  date: string;
  isOpen: boolean;
  onClose: () => void;
};

type Schedule = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
};

type Reservation = {
  id: number;
  status: string;
  totalPrice: number;
  headCount: number;
  nickname: string;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  activityId: number;
  scheduleId: number;
  reviewSubmitted: boolean;
  teamId: string;
};

type BookingStatus = 'pending' | 'declined' | 'confirmed' | undefined;

export default function BookingDetailModal({
  activityId,
  date,
  isOpen,
  onClose,
}: BookingDetailModalProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedTab, setSelectedTab] = useState<BookingStatus>('pending');
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const deviceState = useDeviceState();

  const fetchBookingDetails = async () => {
    try {
      const response = await getMyActivitiesReservedSchedule({
        activityId,
        date,
      });
      setSchedules(response);
      if (response.length > 0) {
        setSelectedSchedule(response[0]);
      }
    } catch (error) {
      console.error('Failed to fetch booking details', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (deviceState === 'MOBILE') {
        document.body.style.overflow = 'hidden';
      }

      fetchBookingDetails();
    } else {
      if (deviceState === 'MOBILE') {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (deviceState === 'MOBILE') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, activityId, date, deviceState]);

  useEffect(() => {
    if (selectedSchedule !== null) {
      const fetchBookingDetailsBySchedule = async () => {
        try {
          const response = await getMyActivitiesReservations({
            activityId,
            scheduleId: selectedSchedule.scheduleId,
            status: selectedTab,
          });
          setReservations(response.reservations);
        } catch (error) {
          console.error('Failed to fetch booking by schedule', error);
        }
      };
      fetchBookingDetailsBySchedule();
    }
  }, [selectedSchedule, selectedTab, activityId]);

  if (!isOpen) return null;

  const handleTabChange = (tab: BookingStatus) => {
    setSelectedTab(tab);
  };

  const handleScheduleChange = (scheduleId: string) => {
    const selected = schedules.find(
      (schedule) => schedule.scheduleId === Number(scheduleId),
    );
    setSelectedSchedule(selected || null);
  };

  const confirmReservation = async (reservationId: number) => {
    try {
      await patchMyActivitiesReservation({
        activityId: activityId,
        reservationId: reservationId,
        status: 'confirmed',
      });
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: 'confirmed' } : r,
        ),
      );
      fetchBookingDetails();
    } catch (error) {
      console.error('Failed to confirm reservation', error);
    }
  };

  const declineReservation = async (reservationId: number) => {
    try {
      await patchMyActivitiesReservation({
        activityId: activityId,
        reservationId: reservationId,
        status: 'declined',
      });
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: 'declined' } : r,
        ),
      );
      fetchBookingDetails();
    } catch (error) {
      console.error('Failed to decline reservation', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex max-h-screen flex-col gap-39 overflow-hidden border-custom-gray-300 bg-white p-24 pb-30 shadow-lg md:relative md:h-full md:rounded-lg md:border-1 lg:h-697 lg:w-429"
    >
      <div className="flex h-48 w-full flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <PaperPlaneIcon className="size-40 opacity-80" />
            <span className="text-28 font-bold">예약정보</span>
          </div>
          <button type="button" onClick={onClose}>
            <XIcon className="size-48" />
          </button>
        </div>
      </div>
      <div className="flex h-43 justify-start border-b-1 border-custom-gray-300">
        <button
          type="button"
          className={`flex h-42 w-72 justify-center text-18 font-semibold ${
            selectedTab === 'pending'
              ? 'border-b-2 border-custom-green-200 text-custom-green-200'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('pending')}
        >
          <span>
            신청 {schedules.reduce((acc, s) => acc + s.count.pending, 0)}
          </span>
        </button>
        <button
          type="button"
          className={`flex h-42 w-72 justify-center text-18 font-semibold ${
            selectedTab === 'confirmed'
              ? 'border-b-2 border-custom-green-200 text-custom-green-200'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('confirmed')}
        >
          <span>
            승인 {schedules.reduce((acc, s) => acc + s.count.confirmed, 0)}
          </span>
        </button>
        <button
          type="button"
          className={`flex h-42 w-72 justify-center text-18 font-semibold ${
            selectedTab === 'declined'
              ? 'border-b-2 border-custom-green-200 text-custom-green-200'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('declined')}
        >
          <span>
            거절 {schedules.reduce((acc, s) => acc + s.count.declined, 0)}
          </span>
        </button>
      </div>
      <div className="flex h-full flex-col overflow-y-auto pb-24">
        <div className="flex flex-col justify-start gap-24">
          <div className="flex flex-col justify-start">
            <span className="mb-16 text-18 font-semibold text-custom-black">
              예약날짜
            </span>
            <span className="mb-2 text-18 font-normal text-custom-black">
              {date}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <span className="mb-16 text-18 font-semibold text-custom-black">
              스케줄 선택
            </span>
            <Dropdown
              selected={`${selectedSchedule?.startTime} - ${selectedSchedule?.endTime}`}
              setSelected={handleScheduleChange}
              height={56}
            >
              <Dropdown.Button
                className="basic-input flex w-full items-center justify-between"
                showArrow={true}
              >
                {selectedSchedule?.startTime} - {selectedSchedule?.endTime}
              </Dropdown.Button>
              <Dropdown.Body>
                {schedules.map((schedule) => (
                  <Dropdown.Item
                    key={schedule.scheduleId}
                    value={String(schedule.scheduleId)}
                  >
                    {schedule.startTime} - {schedule.endTime}
                  </Dropdown.Item>
                ))}
              </Dropdown.Body>
            </Dropdown>
          </div>
        </div>
        <div className="mt-16 flex flex-1 flex-col gap-24">
          <span className="text-18 font-semibold text-custom-black">
            예약내역
          </span>
          <div className="flex flex-col gap-16">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex flex-col justify-center gap-6 rounded-xl border-1 border-custom-gray-300 p-16"
              >
                <div className="flex gap-10">
                  <span className="text-16 font-semibold text-custom-gray-700">
                    닉네임
                  </span>
                  <span className="text-16 font-medium text-custom-black">
                    {reservation.nickname}
                  </span>
                </div>
                <div className="flex gap-10">
                  <span className="text-16 font-semibold text-custom-gray-700">
                    인원
                  </span>
                  <span className="text-16 font-medium text-custom-black">
                    {reservation.headCount}
                  </span>
                </div>
                <div className="flex w-full justify-end">
                  {reservation.status === 'pending' && (
                    <div className="flex w-220 gap-6">
                      <Button
                        variant="activeButton"
                        hasICon={false}
                        className="h-38"
                        onClick={() => confirmReservation(reservation.id)}
                      >
                        승인하기
                      </Button>
                      <Button
                        variant="inactiveButton"
                        hasICon={false}
                        className="h-38"
                        onClick={() => declineReservation(reservation.id)}
                      >
                        거절하기
                      </Button>
                    </div>
                  )}
                  {reservation.status === 'confirmed' && (
                    <div className="flex-center h-44 w-82 rounded-[26px] bg-custom-orange-100 text-14 font-bold text-custom-orange-200">
                      <span>예약 승인</span>
                    </div>
                  )}
                  {reservation.status === 'declined' && (
                    <div className="flex-center h-44 w-82 rounded-[26px] bg-custom-red-100 text-14 font-bold text-custom-red-200">
                      <span>예약 거절</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
