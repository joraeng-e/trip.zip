import tripZip from '@/../public/logo/tripZip.webp';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DarkModeToggleButton from './_components/DarkModeToggleButton';
import LoggedInHeader from './_components/LoggedInHeader';
import LoggedOutHeader from './_components/LoggedOutHeader';

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHeaderScrollValid = useMemo(() => {
    return scrollPosition === 0;
  }, [scrollPosition]);

  const checkLoginState = () => {
    // 쿠키에서 accessToken을 확인해 로그인 상태 결정
    const accessToken = getCookie('accessToken');
    setLoggedIn(!!accessToken);
  };

  useEffect(() => {
    checkLoginState();
  }, [router.pathname]);

  return (
    <header
      className={`dark-base sticky top-0 z-20 h-50 w-full bg-white transition-all duration-500 md:h-70 ${isHeaderScrollValid || 'shadow-lg'} dark:shadow-custom-gray-700`}
    >
      <div className="basic-container flex items-center justify-between">
        <Link
          href="/activities"
          aria-label="메인페이지로 이동"
          className="w-90 md:w-130"
        >
          <Image
            src={tripZip}
            alt="trip.zip"
            width={130}
            height={20}
            priority
          />
        </Link>
        <div className="flex items-center gap-20">
          <DarkModeToggleButton />
          {loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
        </div>
      </div>
    </header>
  );
}
