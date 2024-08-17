import { useLoading } from '@/hooks/useLoading';
import { getCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import Footer from '../Footer';
import Header from '../Header';
import Loading from '../Loading';
import { notify } from '../Toast';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

const MYPAGE_PATHS = [
  '/mypage',
  '/mypage/info',
  '/mypage/reservationList',
  '/mypage/myActivities',
  '/mypage/reservationStatus',
];
const AUTH_PATHS = [
  '/login',
  '/signup',
  '/login/oauth/kakao',
  '/signup/oauth/kakao',
  '/login/oauth/google',
  '/signup/oauth/google',
];

/**
 * 페이지 컴포넌트를 감싸는 레이아웃 컴포넌트입니다🙇🏻‍♂️
 * Private path로 접근하는 경우 로그인여부 확인
 *
 * @param {ReactNode} children - 페이지 컴포넌트
 * @param {boolean} [showHeader=true] - header 렌더링 여부(optional, default true)
 * @param {boolean} [showFooter=true] - footer 렌더링 여부(optional, default true)
 * @returns {JSX.Element} 렌더링 여부에 따라 header, footer 적용된 layout 반환
 */
export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
}: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (MYPAGE_PATHS.includes(pathname)) {
      const token = getCookie('accessToken');
      if (!token) {
        notify('warning', '로그인이 필요한 서비스입니다.');
        router.push('/login');
      }
    }
  }, [pathname, router]);

  if (pathname === '/') {
    showHeader = false;
  }

  if (AUTH_PATHS.includes(pathname)) {
    showHeader = false;
    showFooter = false;
  }

  const isMyPage = pathname
    ? MYPAGE_PATHS.some((path) => pathname.startsWith(path))
    : false;

  const loading = useLoading();

  return (
    <>
      {showHeader && <Header />}
      {loading ? (
        <Loading />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={isMyPage ? undefined : { opacity: 0, y: -50 }}
            animate={isMyPage ? undefined : { opacity: 1, y: 0 }}
            exit={isMyPage ? undefined : { opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {children}
            {showFooter && <Footer />}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
