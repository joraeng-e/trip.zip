import { PaperPlaneIcon } from '@/libs/utils/Icon';
import Head from 'next/head';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Trip.zip</title>
        <meta name="description" content="Trip.zip을 시작해보세요." />
        <meta property="og:title" content="PrivacyPolicy - Trip.zip" />
        <meta
          property="og:description"
          content="Trip.zip과 함께 특별한 여행을 계획해보세요."
        />
      </Head>
      <div className="page-container px-30 pb-30">
        <div className="flex items-center">
          <PaperPlaneIcon className="size-40 opacity-80" />
          <h1 className="my-10 text-3xl-bold">개인정보 처리방침</h1>
        </div>
        <p className="mb-16">
          본 개인정보 처리방침은 귀하의 개인정보가 어떻게 수집되고, 사용되며,
          보호되는지에 대해 설명합니다.
        </p>
        <h2 className="text-2xl-semibold">1. 개인정보 수집</h2>
        <p className="mb-16">
          우리는 귀하의 개인정보를 다음과 같은 방법으로 수집할 수 있습니다.
          <ul className="list-disc pl-20">
            <li>회원 가입 시 제공된 정보</li>
            <li>서비스 이용 중 자동으로 수집되는 정보</li>
          </ul>
        </p>
        <h2 className="text-2xl-semibold">2. 개인정보 이용</h2>
        <p className="mb-16">
          수집된 개인정보는 다음과 같은 용도로 사용됩니다.
          <ul className="list-disc pl-20">
            <li>서비스 제공 및 유지 관리</li>
            <li>서비스 개선 및 개발</li>
            <li>고객 지원 제공</li>
          </ul>
        </p>
        <h2 className="text-2xl-semibold">3. 개인정보 보호</h2>
        <p className="mb-16">
          우리는 귀하의 개인정보를 보호하기 위해 다음과 같은 조치를 취합니다.
          <ul className="list-disc pl-20">
            <li>암호화 및 보안 프로토콜 사용</li>
            <li>접근 제어 및 내부 관리</li>
          </ul>
        </p>
        <h2 className="text-2xl-semibold">4. 개인정보 제3자 제공</h2>
        <p className="mb-16">
          우리는 법적 요구가 있는 경우를 제외하고 귀하의 개인정보를 제3자에게
          제공하지 않습니다.
        </p>
        <h2 className="text-2xl-semibold">5. 개인정보 접근 및 수정</h2>
        <p className="mb-16">
          귀하는 언제든지 자신의 개인정보에 접근하고 수정할 수 있는 권리가
          있습니다. 이를 원하시면 고객 지원팀에 연락해 주시기 바랍니다.
        </p>
        <h2 className="text-2xl-semibold">6. 변경 사항</h2>
        <p className="mb-16">
          개인정보 처리방침은 수시로 변경될 수 있습니다. 변경 사항이 있을 경우
          웹사이트에 공지합니다.
        </p>
        <h2 className="text-2xl-semibold">7. 문의처</h2>
        <p className="mb-16">
          개인정보와 관련된 문의는 다음의 연락처로 주시기 바랍니다.
          <ul className="list-disc pl-20">
            <li>이메일: joraeng@tripZip.com</li>
            <li>전화: 1234-5678</li>
          </ul>
        </p>
      </div>
    </>
  );
}
