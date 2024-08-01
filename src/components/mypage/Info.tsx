import { myInfoSchema } from '@/libs/utils/schemas/myInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';

type FormData = {
  nickname: string;
  email: string;
  password: string;
  reEnterPassword: string;
};

export default function Info() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(myInfoSchema),
    mode: 'all',
  });
  return (
    <div className="mb-70 h-fit">
      <div className="mb-30 flex w-full items-center justify-between">
        <h1 className="text-3xl-bold">내 정보</h1>
        <Button className="max-w-120 rounded-md py-12">저장하기</Button>
      </div>
      <form className="flex flex-col gap-24">
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          register={register('nickname')}
          error={errors.nickname}
          maxWidth="792px"
          onBlur={() => trigger('nickname')}
        />
        <Input
          label="이메일"
          name="email"
          type="text"
          placeholder="이메일을 입력해 주세요"
          register={register('email')}
          error={errors.email}
          onBlur={() => trigger('email')}
          maxWidth="792px"
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          register={register('password')}
          error={errors.password}
          onBlur={() => trigger('password')}
          maxWidth="792px"
        />
        <Input
          label="비밀번호 확인"
          name="reEnterPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          register={register('reEnterPassword')}
          error={errors.reEnterPassword}
          onBlur={() => trigger('reEnterPassword')}
          maxWidth="792px"
        />
      </form>
    </div>
  );
}
