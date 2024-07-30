import tripZip from '@/../public/logo/tripZip.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import { postUser } from '@/libs/api/user';
import { signupSchema } from '@/libs/utils/schemas/signupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { RegisterRequest, RegisterResponse } from '@trip.zip-api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
    mode: 'all',
  });

  const router = useRouter();

  const mutation = useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: postUser,
    onSuccess: (data: RegisterResponse) => {
      console.log('회원가입 성공', data);
      // TODO: 모달 띄우기
      router.push('/');
    },
    onError: (error: Error) => {
      if (error.message === '중복된 이메일입니다.') {
        alert('중복된 이메일입니다.');
        // TODO: alert 대신 모달 띄우기
      } else {
        console.error('회원가입 실패', error);
      }
    },
  });

  // confirmPassword를 제외하고 폼 제출
  const onSubmit: SubmitHandler<FormData> = ({ confirmPassword, ...data }) => {
    const registerData: RegisterRequest = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    };
    mutation.mutate(registerData);
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
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            register={register('nickname')}
            error={errors.nickname}
            onBlur={() => trigger('nickname')}
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            register={register('password')}
            error={errors.password}
            onBlur={() => trigger('password')}
          />
          <Input
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            register={register('confirmPassword')}
            error={errors.confirmPassword}
            onBlur={() => trigger('confirmPassword')}
          />
          <Button
            type="submit"
            className="rounded-md"
            variant={isValid ? 'activeButton' : 'disabledButton'}
          >
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
