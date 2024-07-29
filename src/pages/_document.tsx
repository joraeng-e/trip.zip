import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <link rel="icon" href="/logo/tripzipFavicon.png" type="image/png" />
      <script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
      ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
