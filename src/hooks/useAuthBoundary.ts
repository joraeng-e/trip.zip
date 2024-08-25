import { notify } from '@/components/commons/Toast';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import router from 'next/router';
import { useEffect } from 'react';

export const useAuthBoundary = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname.startsWith('/mypage')) {
      const token = getCookie('accessToken');
      if (!token) {
        notify('warning', '로그인이 필요한 서비스입니다.');
        router.push('/login');
      }
    }
  }, [pathname, router]);
};
