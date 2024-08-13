import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useLoading = () => {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [hasLoadedPages, setHasLoadedPages] = useState(new Set()); // 로드된 페이지 추적

  useEffect(() => {
    const start = (url: string) => {
      // 쿼리 스트링이 포함된 URL은 로딩 화면을 보이지 않도록 처리
      if (!hasLoadedPages.has(url) && !url.includes('?')) {
        setShowLoading(true);
      }
    };

    const end = (url: string) => {
      setShowLoading(false); // 로딩 종료 시 showLoading을 false로
      setHasLoadedPages((prev) => new Set(prev).add(url)); // 현재 페이지를 로드된 페이지에 추가
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    // 쿼리 파라미터 변경 감지
    const handleQueryChange = (url: string) => {
      // 쿼리 스트링이 포함된 URL은 로딩 화면을 보이지 않도록 처리
      if (!hasLoadedPages.has(url) && !url.includes('?')) {
        setShowLoading(false);
      }
    };

    router.events.on('routeChangeComplete', handleQueryChange);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
      router.events.off('routeChangeComplete', handleQueryChange);
    };
  }, [hasLoadedPages, router.events]);

  return showLoading;
};
