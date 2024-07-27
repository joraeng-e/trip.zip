import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import tripZip from '/public/logo/tripZip.png';

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
        <Link href="/">
          <Image src={tripZip} alt="trip.zip" width={130} height={20} />
        </Link>
        <div className="flex gap-16">
          <Link
            href="login"
            className="transition-all duration-500 hover:text-custom-green-200 hover:underline hover:decoration-custom-green-200 hover:decoration-2 hover:underline-offset-4 hover:transition-all"
          >
            로그인
          </Link>
          <Link
            href="signup"
            className="transition-all duration-500 hover:text-custom-green-200 hover:underline hover:decoration-custom-green-200 hover:decoration-2 hover:underline-offset-4 hover:transition-all"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}
