import React from 'react';

import Button from '../commons/Button';

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
