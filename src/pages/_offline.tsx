import Layout from '@/components/commons/PageLayouts';
import { ReactElement } from 'react';

export default function OfflinePage() {
  return (
    <main className="flex-center h-screen">
      <h1 className="text-20 font-semibold">네트워크 연결을 확인하세요.</h1>
    </main>
  );
}

OfflinePage.getLayout = (page: ReactElement) => (
  <Layout showHeader={false} showFooter={false}>
    {page}
  </Layout>
);
