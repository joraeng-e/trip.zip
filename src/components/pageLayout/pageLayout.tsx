import { getUser } from '@/libs/api/user';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

const PRIVATE_PATHS = ['/private'];
// Todo : "내 정보, 예약내역, 내 체험 관리, 내 체험 등록, 내 체험 수정, 예약 현황, 알림(모달), 후기 작성(모달)" PRIVATE_PATH list에 추가

export default function Layout({
  children,
  showHeader,
  showFooter,
}: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (PRIVATE_PATHS.includes(pathname)) {
    const result = getUser();
    if (!result) router.push('/login');
  }

  return <>{children}</>;
}
