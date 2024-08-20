import { PaperPlaneIcon } from '@/libs/utils/Icon';
import Head from 'next/head';
import React from 'react';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Trip.zip</title>
        <meta name="description" content="Trip.zip을 시작해보세요." />
        <meta property="og:title" content="FAQ - Trip.zip" />
        <meta
          property="og:description"
          content="Trip.zip과 함께 특별한 여행을 계획해보세요."
        />
      </Head>
      <div className="page-container px-30 pb-30">
        <div className="flex items-center">
          <PaperPlaneIcon className="size-40 opacity-80" />
          <h1 className="my-10 text-3xl-bold">자주 묻는 질문 (FAQ)</h1>
        </div>
        {/* 로그인/회원가입 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          1. 로그인 시 비밀번호가 틀리면 어떻게 하나요?
        </h2>
        <p className="mb-20">
          비밀번호가 틀릴 경우 “비밀번호가 일치하지 않습니다.”라는 경고 창이
          나타납니다. 올바른 비밀번호를 입력하여 다시 시도해 주세요.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          2. 이메일 형식이 잘못된 경우 어떻게 하나요?
        </h2>
        <p className="mb-20">
          이메일 입력란에서 이메일 형식이 맞지 않으면 빨간색 테두리와 함께
          “이메일 형식으로 작성해 주세요.”라는 에러 메시지가 표시됩니다. 올바른
          이메일 형식을 입력해 주세요.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          3. 비밀번호가 8자 미만일 때 어떻게 하나요?
        </h2>
        <p className="mb-20">
          비밀번호 입력란에서 비밀번호 길이가 8자 미만일 경우 빨간색 테두리와
          함께 “8자 이상 작성해 주세요.”라는 에러 메시지가 표시됩니다. 8자
          이상의 비밀번호를 입력해 주세요.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          4. 회원가입 시 중복된 이메일로 가입할 수 있나요?
        </h2>
        <p className="mb-20">
          중복된 이메일로 가입을 시도하면 “중복된 이메일입니다.”라는 에러
          메시지가 나타납니다. 다른 이메일 주소를 사용해 주세요.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          5. 회원가입 후 어떻게 로그인을 하나요?
        </h2>
        <p className="mb-20">
          회원가입이 완료되면 로그인 페이지로 이동하여 유효한 이메일과
          비밀번호를 입력한 후 “로그인 하기” 버튼을 클릭하여 로그인하시면
          됩니다.
        </p>

        {/* 메인 페이지 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          6. 메인 페이지에서 카테고리 필터는 어떻게 사용하나요?
        </h2>
        <p className="mb-20">
          메인 페이지에서 특정 카테고리를 선택하면 해당 카테고리에 대한 체험으로
          필터링됩니다. 페이지 네이션 및 최신순으로 정렬됩니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          7. 검색 기능을 사용할 때 필터가 초기화되나요?
        </h2>
        <p className="mb-20">
          검색어를 입력하고 ‘검색하기’ 버튼을 클릭하면 카테고리나 가격 순 필터가
          초기화됩니다. 검색 결과는 제목에 검색어가 포함된 체험으로 정렬됩니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          8. 인기 체험은 어떻게 정렬되나요?
        </h2>
        <p className="mb-20">
          인기 체험은 댓글 수가 많은 순으로 정렬됩니다. 카테고리, 정렬, 키워드
          검색과는 독립적으로 정렬됩니다.
        </p>

        {/* 체험 상세 페이지 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          9. 예약 가능한 시간을 어떻게 선택하나요?
        </h2>
        <p className="mb-20">
          캘린더에서 특정 날짜를 선택하면 예약 가능한 시간이 체크박스로
          표시됩니다. 한 번의 예약에는 한 타임만 선택할 수 있습니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          10. 예약 가능한 시간 선택 후 참여 인원은 어떻게 설정하나요?
        </h2>
        <p className="mb-20">
          예약 가능한 시간을 선택한 후, 참여 인원수를 설정하고 ‘예약하기’ 버튼을
          클릭하면 예약이 완료됩니다. 참여 인원에 따라 총합계 금액이 달라집니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          11. 체험 위치는 어떻게 확인하나요?
        </h2>
        <p className="mb-20">
          체험 상세 페이지에서 카카오 지도를 통해 체험 위치를 확인할 수
          있습니다.
        </p>

        {/* 내 정보 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          12. 프로필 이미지를 변경하려면 어떻게 하나요?
        </h2>
        <p className="mb-20">
          ‘연필’ 버튼을 클릭하여 이미지를 업로드할 수 있습니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          13. 비밀번호를 변경할 때 주의할 점은 무엇인가요?
        </h2>
        <p className="mb-20">
          새 비밀번호 확인 입력란에서 새 비밀번호와 다를 경우 빨간색 테두리와
          “비밀번호가 일치하지 않습니다”라는 에러 메시지가 표시됩니다.
        </p>

        {/* 예약 내역 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          14. 예약 내역은 어떻게 정렬되나요?
        </h2>
        <p className="mb-20">
          예약 내역은 최신순으로 정렬되며 무한 스크롤로 표시됩니다. 예약 신청,
          취소, 승인, 거절, 체험 완료로 분류됩니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          15. 예약 완료된 체험은 어떻게 관리하나요?
        </h2>
        <p className="mb-20">
          예약 완료된 체험은 예약 취소가 가능합니다. 이용 완료된 체험은 ‘후기
          작성’ 버튼을 통해 후기를 작성할 수 있습니다.
        </p>

        {/* 내 체험 관리 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          16. 체험 삭제는 어떻게 하나요?
        </h2>
        <p className="mb-20">
          예약 대기 상태나 승인 상태의 체험은 삭제할 수 없습니다. 거절이나 완료
          상태만 있는 체험은 삭제할 수 있으며, 모두 값이 없을 경우 삭제
          가능합니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          17. 체험을 수정하거나 삭제할 때 확인 메시지가 나타나나요?
        </h2>
        <p className="mb-20">
          ‘삭제하기’ 버튼을 누르면 “삭제하시겠습니까?”라는 모달 창이 나타납니다.
          “예”를 누르면 체험이 삭제됩니다.
        </p>

        {/* 내 체험 등록 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          18. 체험 등록 시 필수 항목은 무엇인가요?
        </h2>
        <p className="mb-20">
          제목, 카테고리, 설명, 가격, 주소, 예약 가능한 시간대, 배너 이미지는
          필수 항목입니다. 카테고리는 드롭 다운으로 선택 가능합니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          19. 예약 가능한 시간은 어떻게 추가하나요?
        </h2>
        <p className="mb-20">
          ‘+’ 버튼을 클릭하여 예약 가능한 시간을 추가하고, ‘-’ 버튼을 클릭하여
          삭제할 수 있습니다. 같은 시간대에는 하나의 체험만 생성할 수 있습니다.
        </p>

        {/* 알림 관련 */}
        <h2 className="text-xl mb-2 mt-6 font-semibold">
          20. 알림 내역은 어떻게 확인하나요?
        </h2>
        <p className="mb-20">
          ‘알림’ 버튼을 클릭하면 알림 내역이 나타납니다. 알림 종류는 예약 승인,
          예약 거절로 무한 스크롤 및 최신순으로 정렬됩니다.
        </p>

        <h2 className="text-xl mb-2 mt-6 font-semibold">
          21. 알림을 읽은 후에는 어떻게 하나요?
        </h2>
        <p className="mb-20">
          알림을 읽은 후 ‘읽음’ 버튼을 클릭하면 해당 알림은 삭제됩니다.
        </p>
      </div>
    </>
  );
}
