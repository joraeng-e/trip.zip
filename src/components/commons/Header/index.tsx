import tripZip from '@/../public/logo/tripZip.webp';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import DarkMode from './_components/DarkMode';
import LoggedInHeader from './_components/LoggedInHeader';
import LoggedOutHeader from './_components/LoggedOutHeader';

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHeaderScrollValid = scrollPosition === 0;

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
      className={`dark-base sticky top-0 z-30 h-70 w-full bg-white transition-all duration-500 ${isHeaderScrollValid || 'shadow-lg'}`}
    >
      <div className="basic-container flex items-center justify-between">
        <Link href="/activities" aria-label="메인페이지로 이동">
          <Image
            src={tripZip}
            alt="trip.zip"
            width={130}
            height={20}
            priority
          />
        </Link>
        <div className="flex items-center gap-20">
          <DarkMode />
          {loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
        </div>
      </div>
    </header>
  );
}
