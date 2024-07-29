import tripZip from '@/../public/logo/tripZip.png';
import { isLogin } from '@/libs/utils/cookie';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import LoggedInHeader from './_components/LoggedInHeader';
import LoggedOutHeader from './_components/LoggedOutHeader';

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <header
      className={`fixed top-0 h-70 w-full bg-white transition-all duration-500 ${isHeaderScrollValid || 'shadow-lg'}`}
    >
      <div className="basic-container flex items-center justify-between">
        <Link href="/" aria-label="메인페이지로 이동">
          <Image src={tripZip} alt="trip.zip" width={130} height={20} />
        </Link>
        {isLogin() ? <LoggedInHeader /> : <LoggedOutHeader />}
      </div>
    </header>
  );
}
