import tripZip from '@/../public/logo/tripZip.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import Modal from '@/components/commons/Modal';
import { postLogin } from '@/libs/api/auth';
import { loginSchema } from '@/libs/utils/schemas/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse } from '@trip.zip-api';
import Image from 'next/image';
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

  // 모달 메시지에 따른 모달 content 설정 및 폼 제출 후 주소 이동
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const router = useRouter();

  const mutation = useMutation<LoginResponse, Error, FormData>({
    mutationFn: postLogin,
    onSuccess: (data: LoginResponse) => {
      console.log('로그인 성공', data);
      setModalMessage('로그인 완료!');
      setIsModalOpen(true);
      setIsSuccessMessage(true);
      document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=strict`;
    },
    onError: (error: ApiError) => {
      if (error.response && error.response.data) {
        const message = error.response.data.message;

        switch (message) {
          case '존재하지 않는 유저입니다.':
            setModalMessage('존재하지 않는 유저입니다.');
            break;
          case '비밀번호가 일치하지 않습니다.':
            setModalMessage('비밀번호가 일치하지 않습니다.');
            break;
          default:
            console.error('로그인 실패', error);
        }

        setIsModalOpen(true);
        setIsSuccessMessage(false);
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    if (isSuccessMessage) router.push('/activities');
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
          {modalMessage && (
            <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
              <Modal.Content>
                <Modal.Description className="py-20 text-center">
                  {modalMessage}
                </Modal.Description>
                <Modal.Close onConfirm={resetModalMessage}>확인</Modal.Close>
              </Modal.Content>
            </Modal.Root>
          )}
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
