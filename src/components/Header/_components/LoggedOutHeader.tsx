import Link from 'next/link';
import React from 'react';

const linkTextStyle =
  'transition-all duration-500 hover:text-custom-green-200 hover:underline hover:decoration-custom-green-200 hover:decoration-2 hover:underline-offset-4 hover:transition-all';

export default function LoggedOutHeader() {
  return (
    <div className="flex gap-16">
      <Link href="login" className={linkTextStyle}>
        로그인
      </Link>
      <Link href="signup" className={linkTextStyle}>
        회원가입
      </Link>
    </div>
  );
}
