import Button from '@/components/button';
import React from 'react';

export default function Info() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>내 정보</h1>
        <Button className="rounded- max-w-80">저장하기</Button>
      </div>
    </div>
  );
}
