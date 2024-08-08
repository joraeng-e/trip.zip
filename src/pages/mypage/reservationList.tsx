import Dropdown, { useDropdownContext } from '@/components/commons/Dropdown';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import { ArrowDown } from '@/libs/utils/Icon';
import React, { useState } from 'react';

export default function ReservationList() {
  const [value, setValue] = useState('첫번째');

  return (
    <MyPageLayout>
      <div className="mb-100 h-fit">
        <div className="mb-30 flex w-full items-center justify-between">
          <h1 className="text-3xl-bold">예약 내역</h1>
          <Dropdown
            selected={value}
            setSelected={setValue}
            width={100}
            maxWidth={160}
            height={50}
            defaultValue="필터"
          >
            <Dropdown.Button className="w-100 rounded-xl border border-custom-green-200 py-6 md:w-160">
              필터
            </Dropdown.Button>
            <Dropdown.Body>
              <Dropdown.Item value="recent">예약 신청</Dropdown.Item>
              <Dropdown.Item value="lowest">예약 취소</Dropdown.Item>
              <Dropdown.Item value="recent">예약 승인</Dropdown.Item>
              <Dropdown.Item value="recent">예약 거절</Dropdown.Item>
              <Dropdown.Item value="recent">체험 완료</Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        </div>
      </div>
    </MyPageLayout>
  );
}
