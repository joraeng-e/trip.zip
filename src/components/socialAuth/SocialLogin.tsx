import { GOOGLE_LOGIN_URL, KAKAO_LOGIN_URL } from '@/libs/constants/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SocialLogin() {
  return (
    <>
      <hr className="relative top-62 -z-10 w-full max-w-640 border-1" />
      <div className="mt-50">
        <p className="bg-white px-30 text-custom-gray-700">
          SNS 계정으로 로그인하기
        </p>
        <div className="flex items-center justify-center gap-10 pt-30">
          <div className="h-48 w-48 md:h-72 md:w-72">
            <Link href={GOOGLE_LOGIN_URL}>
              <Image
                src="/imgs/google.png"
                width={72}
                height={72}
                alt="구글로 로그인"
                className="cursor-pointer"
              />{' '}
            </Link>
          </div>
          <div className="h-48 w-48 md:h-72 md:w-72">
            <Link href={KAKAO_LOGIN_URL}>
              <Image
                src="/imgs/kakao.png"
                width={72}
                height={72}
                alt="카카오로 로그인"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
