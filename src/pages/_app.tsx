import Layout from '@/components/pageLayout/pageLayout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  /**
   * 레이아웃이 적용된 페이지 컴포넌트 반환해주는 함수
   *
   * 페이지 컴포넌트 index에서 해당 함수 호출 시에만 레이아웃이 적용
   *
   * @param {ReactElement} page - 레이아웃으로 감싸줄 컴포넌트
   * @returns {ReactNode} 레이아웃이 적용된 컴포넌트 반환
   *
   * ```tsx
   * import Layout from '@/components/pageLayout/pageLayout';
   * import type { ReactElement } from 'react';
   *
   * export default PageName = () => {
   *   return <div>About Page</div>;
   * };
   *
   * PageName.getLayout = (page: ReactElement) => (
   *   <Layout showHeader={false} showFooter={true}>
   *     {page}
   *   </Layout>
   * );
   * ```
   */
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}
