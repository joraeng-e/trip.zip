import Layout from '@/components/commons/PageLayouts';
import { StyledToastContainer } from '@/styles/ToastStyle';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import React, { useState } from 'react';
import { Zoom } from 'react-toastify';

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

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="체험 상품을 보고 간단하게 예약할 수 있는 서비스"
        />
        <meta property="og:title" content="Trip.zip" />
        <meta
          property="og:description"
          content="체험 상품을 보고 간단하게 예약할 수 있는 서비스"
        />
        <meta property="og:image" content="/logo/tripZip.png" />
        <meta property="og:url" content="https://trip-zip.vercel.app/" />
        <link rel="icon" href="/logo/tripzipFavicon.png" type="image/png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        <StyledToastContainer limit={1} transition={Zoom} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
