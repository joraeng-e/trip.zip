import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export const useLoading = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoadedPages, setHasLoadedPages] = useState(new Set()); // 로드된 페이지 추적

  useEffect(() => {
    const start = (url: string) => {
      if (hasLoadedPages.has(url)) return; // 이미 로드된 페이지에서는 로딩 시작하지 않음
      setShowLoading(true);
    };

    const end = (url: string) => {
      setShowLoading(false); // 로딩 종료 시 showLoading을 false로
      setHasLoadedPages((prev) => new Set(prev).add(url)); // 현재 페이지를 로드된 페이지에 추가
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [hasLoadedPages]);

  return showLoading;
};
