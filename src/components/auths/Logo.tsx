import tripZip from '@/../public/logo/tripZip.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <div>
      <Link href="/" aria-label="메인페이지로 이동">
        <Image src={tripZip} alt="trip.zip" width={300} height={20} />
      </Link>
    </div>
  );
}
