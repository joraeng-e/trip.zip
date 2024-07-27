import Header from '@/components/Header';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="page-container bg-gray-500">
        <button className="flex-center h-35 rounded-full border-2 px-10 text-24">
          버튼
        </button>
        <div className="text-xl-bold text-custom-orange-200"></div>
      </main>
    </div>
  );
}
