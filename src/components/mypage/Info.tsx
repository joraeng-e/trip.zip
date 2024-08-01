import React from 'react';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';

export default function Info() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl-bold">내 정보</h1>
        <Button className="max-w-120 rounded-md py-12">저장하기</Button>
      </div>
      <form>
        {/* <Input
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="이메일을 입력해주세요"
          register={register('nickname')}
          error={errors.email}
          maxWidth="640px"
          onBlur={() => trigger('nickname')}
        /> */}
      </form>
    </div>
  );
}
