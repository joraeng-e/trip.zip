import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/mypage/info');
  }, [router]);

  return null;
};

export default MyPage;
