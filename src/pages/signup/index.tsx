import Button from '@/components/button';
import Input from '@/components/input/Input';
import { schema } from '@/libs/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  price: number;
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
    <div className="page-container">
      <div className="flex flex-col items-center justify-center">
        <Link href="/" aria-label="메인페이지로 이동">
          <Image
            src="/logo/tripzip.png"
            alt="trip.zip"
            width={300}
            height={20}
          />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-640 flex-col gap-16"
        >
          <Input
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해 주세요"
            register={register('email')}
            error={errors.email}
          />
          <Input
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            register={register('password')}
            error={errors.password}
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            register={register('password')}
            error={errors.password}
          />
          <Input
            label="비밀번호 확인"
            name="password"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            register={register('password')}
            error={errors.password}
          />
          <Button type="submit" className="rounded-md" variant="disabledButton">
            회원가입 하기
          </Button>
        </form>
        <div className="text-md mt-20 flex gap-8">
          <p>회원이신가요?</p>
          <Link
            href="login"
            className="text-custom-green-200 underline decoration-custom-green-200 underline-offset-2"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
