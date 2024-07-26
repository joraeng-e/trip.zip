import Button from '@/components/button/Button';
import React from 'react';

export default function Home() {
  return (
    <div className="p-100">
      <main className="basic-container mb-20 bg-gray-500">
        <button className="flex-center h-35 rounded-full border-2 px-10 text-24">
          버튼
        </button>
        <div className="text-xl-bold text-custom-orange-200"></div>
        메인페이지
      </main>
      <Button variant="inactiveButton" className="h-100 w-200" icon={true}>
        로그인 하기
      </Button>
    </div>
  );
}
