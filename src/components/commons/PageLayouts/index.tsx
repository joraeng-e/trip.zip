import { useLoading } from '@/hooks/useLoading';
import { getUser } from '@/libs/api/user';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';
import Loading from '../Loading';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

const PRIVATE_PATHS = ['/private'];
const MYPAGE_PATHS = [
  '/mypage',
  '/mypage/info',
  '/mypage/reservationList',
  '/mypage/myActivities',
  '/mypage/reservationStatus',
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

  if (PRIVATE_PATHS.includes(pathname)) {
    const result = getUser();
    if (!result) router.push('/login');
  }

  if (pathname === '/login' || pathname === '/signup') {
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
