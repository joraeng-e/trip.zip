import { getUser } from '@/libs/api/user';
import { myInfoSchema } from '@/libs/utils/schemas/myInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';

type FormData = {
  nickname: string;
  email: string;
  password: string;
  reEnterPassword: string;
};

const fetchUserInfo = async () => {
  const userInfo = await getUser();
  return userInfo;
};

export default function Info() {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(myInfoSchema),
    mode: 'all',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      reEnterPassword: '',
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        nickname: userInfo.nickname,
        email: userInfo.email,
      });
    }
  }, [userInfo, reset]);

  return (
    <div className="mb-70 h-fit">
      <div className="mb-30 flex w-full items-center justify-between">
        <h1 className="text-3xl-bold">내 정보</h1>
        <Button
          type="submit"
          className="max-w-120 rounded-md py-12"
          variant={isValid ? 'activeButton' : 'disabledButton'}
        >
          저장하기
        </Button>
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
          maxWidth="792px"
          onBlur={() => trigger('email')}
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          register={register('password')}
          error={errors.password}
          maxWidth="792px"
          onBlur={() => trigger('password')}
        />
        <Input
          label="비밀번호 재입력"
          name="reEnterPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          register={register('reEnterPassword')}
          error={errors.reEnterPassword}
          maxWidth="792px"
          onBlur={() => trigger('reEnterPassword')}
        />
      </form>
    </div>
  );
}
