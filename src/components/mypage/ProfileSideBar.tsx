import { useTabContext } from '@/context/TabContext';
import { getUser } from '@/libs/api/user';
import {
  BaseProfile,
  Logout,
  ProfileAccountIcon,
  ProfileCalendarIcon,
  ProfileChecklistIcon,
  ProfileCogIcon,
} from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const baseTextStyle =
  'group flex cursor-pointer items-center gap-12 rounded-xl px-20 py-8 text-lg-bold transition-all';
const textGroupStyle =
  'text-gray-400 hover:bg-custom-green-100 hover:text-nomad-black ';
const activeStyle = 'bg-custom-green-100 text-nomad-black';
const svgStyle = 'fill-gray-400 transition-all group-hover:fill-nomad-black';
const svgActiveStyle = 'fill-nomad-black';

type ProfileSideBarProps = {
  toggleOpen: () => void;
};

const ProfileSideBar = ({ toggleOpen }: ProfileSideBarProps) => {
  const { activeTab, setActiveTab } = useTabContext();
  const router = useRouter();

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('isLogin');
    router.push('/');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    toggleOpen();
  };

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    staleTime: 0,
  });

  useEffect(() => {
    const path = router.pathname;
    const tab = path.split('/mypage/')[1]; // URL 경로에서 탭 추출
    setActiveTab(tab || 'info'); // 기본값 'info'
  }, [router.pathname, setActiveTab]);

  return (
    <div className="flex-center mb-30 h-fit w-344 flex-col gap-20 rounded-xl border-2 bg-white py-20 shadow-lg md:w-250 lg:w-344">
      <div className="relative flex items-center justify-center gap-24 md:flex-col md:gap-10 lg:flex-row lg:gap-24">
        <div className="relative h-80 w-80 overflow-hidden rounded-full border-2">
          {userInfo?.profileImageUrl ? (
            <Image
              src={userInfo?.profileImageUrl}
              alt="trip.zip"
              className="h-full w-full object-cover"
              width={40}
              height={40}
            />
          ) : (
            <BaseProfile className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-col md:text-center lg:text-left">
          <p className="text-2xl-bold md:text-xl-bold lg:text-2xl-bold">
            {userInfo?.nickname}
          </p>
          <p className="text-md-medium md:text-sm-medium lg:text-md-medium">
            {userInfo?.email}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-12 px-12">
        <hr className="border-1" />
        <Link href="/mypage">
          <div
            className={`${baseTextStyle} ${activeTab === 'info' ? activeStyle : textGroupStyle}`}
            onClick={() => handleTabClick('info')}
          >
            <ProfileAccountIcon
              className={`${activeTab === 'info' ? svgActiveStyle : svgStyle}`}
            />
            <p>내 정보</p>
          </div>
        </Link>
        <Link href="/mypage/reservationList">
          <div
            className={`${baseTextStyle} ${activeTab === 'reservationList' ? activeStyle : textGroupStyle}`}
            onClick={() => handleTabClick('reservationList')}
          >
            <ProfileChecklistIcon
              className={`${activeTab === 'reservationList' ? svgActiveStyle : svgStyle}`}
            />
            <p>예약 내역</p>
          </div>
        </Link>
        <Link href="/mypage/myActivities">
          <div
            className={`${baseTextStyle} ${activeTab === 'myActivities' ? activeStyle : textGroupStyle}`}
            onClick={() => handleTabClick('myActivities')}
          >
            <ProfileCogIcon
              className={`${activeTab === 'myActivities' ? svgActiveStyle : svgStyle}`}
            />
            <p>내 체험 관리</p>
          </div>
        </Link>
        <Link href="/mypage/calendar">
          <div
            className={`${baseTextStyle} ${activeTab === 'reservationStatus' ? activeStyle : textGroupStyle}`}
            onClick={() => handleTabClick('reservationStatus')}
          >
            <ProfileCalendarIcon
              className={`${activeTab === 'reservationStatus' ? svgActiveStyle : svgStyle}`}
            />
            <p>예약 현황</p>
          </div>
        </Link>
        <hr className="border-1" />
        <div
          className={`text-black ${baseTextStyle} hover:bg-custom-green-100`}
          onClick={logout}
        >
          <Logout className="h-20 w-20" />
          <p>로그아웃</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
