import tripZip from '@/../public/logo/tripZip.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import { postLogin } from '@/libs/api/auth';
import { loginSchema } from '@/libs/utils/schemas/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse } from '@trip.zip-api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  });

  const router = useRouter();

  const mutation = useMutation<LoginResponse, Error, FormData>({
    mutationFn: postLogin,
    onSuccess: (data: LoginResponse) => {
      console.log('로그인 성공', data);
      // TODO: 모달 띄우기
      document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=strict`;

      router.push('/');
    },
    onError: (error: Error) => {
      if (error.message === '존재하지 않는 유저입니다.') {
        alert('존재하지 않는 유저입니다.');
        // TODO: alert 대신 모달 띄우기
      } else if (error.message === '비밀번호가 일치하지 않습니다.') {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        console.error('로그인 실패', error);
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="page-container">
      <div className="flex flex-col items-center justify-center">
        <Link href="/" aria-label="메인페이지로 이동">
          <Image src={tripZip} alt="trip.zip" width={300} height={20} />
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
            onBlur={() => trigger('email')}
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            register={register('password')}
            error={errors.password}
            onBlur={() => trigger('password')}
          />
          <Button
            type="submit"
            className="rounded-md"
            variant={isValid ? 'activeButton' : 'disabledButton'}
          >
            로그인 하기
          </Button>
        </form>
        <div className="text-md mt-20 flex gap-8">
          <p>회원이 아니신가요?</p>
          <Link
            href="/signup"
            className="text-custom-green-200 underline decoration-custom-green-200 underline-offset-2"
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
