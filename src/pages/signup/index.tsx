import Input from '@/components/inputs/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { schema } from './schema';

type FormData = {
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('폼 제출', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이메일"
        name="email"
        type="text"
        placeholder="이메일을 입력해주세요"
        register={register('email')}
        error={errors.email}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register('password')}
        error={errors.password}
      />
      {/* <Input
        label="닉네임"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
      />
      <Input
        label="비밀번호 확인"
        name="password"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
      /> */}
      <button type="submit">제출</button>
    </form>
  );
}
