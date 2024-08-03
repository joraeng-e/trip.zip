import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
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
      <link rel="icon" href="/logo/tripzipFavicon.png" type="image/png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
