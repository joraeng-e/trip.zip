import { getUser } from '@/libs/api/user';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

const PRIVATE_PATHS = ['/private'];
// Todo : "내 정보, 예약내역, 내 체험 관리, 내 체험 등록, 내 체험 수정, 예약 현황, 알림(모달), 후기 작성(모달)" PRIVATE_PATH list에 추가

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

  return (
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
