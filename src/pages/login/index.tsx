import Logo from '@/components/auths/Logo';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import Loading from '@/components/commons/Loading';
import { notify } from '@/components/commons/Toast';
import SocialLogin from '@/components/socialAuth/SocialLogin';
import { postLogin } from '@/libs/api/auth';
import { loginSchema } from '@/libs/utils/schemas/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse } from '@trip.zip-api';
import { setCookie } from 'cookies-next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

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

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const mutation = useMutation<LoginResponse, Error, FormData>({
    mutationFn: postLogin,
    onSuccess: (data: LoginResponse) => {
      setIsLoading(true);
      notify('success', '로그인 완료!');
      setCookie('accessToken', data.accessToken, {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      setCookie('refreshToken', data.refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      router.push('/activities');
    },
    onError: (error: ApiError) => {
      if (error.response && error.response.data) {
        const message = error.response.data.message;

        switch (message) {
          case '존재하지 않는 유저입니다.':
            notify('error', '존재하지 않는 유저입니다.');
            break;
          case '비밀번호가 일치하지 않습니다.':
            notify('error', '비밀번호가 일치하지 않습니다.');
            break;
          default:
            console.error('로그인 실패', error);
        }
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Head>
        <title>로그인 - Trip.zip</title>
        <meta
          name="description"
          content="Trip.zip에 로그인해 체험 상품을 예약하세요."
        />
        <meta property="og:title" content="로그인 - Trip.zip" />
        <meta
          property="og:description"
          content="Trip.zip에 로그인해 체험 상품을 예약하세요."
        />
      </Head>
      <div className="page-container">
        <div className="flex flex-col items-center justify-center">
          <Logo />
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
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                className="rounded-md"
                variant={isValid ? 'activeButton' : 'disabledButton'}
              >
                로그인 하기
              </Button>
            )}
          </form>
          <div className="text-md mt-20 flex gap-8">
            <p>회원이 아니신가요?</p>
            <Link
              href="/signup"
              className="text-custom-green-200 underline decoration-custom-green-200 underline-offset-2 dark:text-custom-green-100 dark:decoration-custom-green-100"
            >
              회원가입하기
            </Link>
          </div>
          <SocialLogin />
        </div>
      </div>
    </>
  );
}
