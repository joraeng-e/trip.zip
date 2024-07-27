import Link from 'next/link';
import React from 'react';

export default function LoggedOutHeader() {
  return (
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
  );
}
