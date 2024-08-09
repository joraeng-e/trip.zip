import { notify } from '@/components/commons/Toast';
import Head from 'next/head';
import React from 'react';

export default function index() {
  const handleSuccessToast = () => {
    notify('success', 'success');
  };
  const handleErrorToast = () => {
    notify('error', 'error');
  };
  const handleInfoToast = () => {
    notify('info', 'info');
  };
  const handleWarningToast = () => {
    notify('warning', 'warning');
  };
  return (
    <>
      <Head>
        <title>Trip.zip</title>
        <meta name="description" content="Trip.zip을 시작해보세요." />
        <meta property="og:title" content="로그인 - Trip.zip" />
        <meta property="og:description" content="Trip.zip을 시작해보세요." />
      </Head>
      <div className="page-container">
        랜딩페이지 예정~~~
        <div className="flex flex-col gap-10">
          <button onClick={handleSuccessToast} className="border">
            success 토스트 알림
          </button>
          <button onClick={handleErrorToast} className="border">
            error 토스트 알림
          </button>
          <button onClick={handleInfoToast} className="border">
            info 토스트 알림
          </button>
          <button onClick={handleWarningToast} className="border">
            warning 토스트 알림
          </button>
        </div>
      </div>
    </>
  );
}
