import { getUser, patchUserInfo } from '@/libs/api/user';
import { myInfoSchema } from '@/libs/utils/schemas/myInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';
import Modal from '../commons/Modal';

type FormData = {
  nickname: string;
  email: string;
  newPassword?: string | null;
  reEnterPassword?: string | null;
};

type registerDataType = {
  nickname?: string;
  newPassword?: string;
};

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

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
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(myInfoSchema),
    mode: 'all',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      reset({
        nickname: userInfo.nickname,
        email: userInfo.email,
        newPassword: '',
        reEnterPassword: '',
      });
    }
  }, [userInfo, reset]);

  const mutation = useMutation({
    mutationFn: patchUserInfo,
    onSuccess: () => {
      console.log('정보 수정 성공');
      setModalMessage('수정 완료!');
      setIsModalOpen(true);
      setIsSuccessMessage(true);
    },
    onError: (error: ApiError) => {
      if (error.response && error.response.data) {
        const message = error.response.data.message;

        switch (message) {
          case '수정할 내용이 없습니다.':
            setModalMessage('변경된 정보가 없습니다.');
            break;
          case '닉네임은 10자 이하로 작성해주세요.':
            setModalMessage('닉네임은 10자 이하로 작성해주세요.');
            break;
          default:
            console.error('로그인 실패', error);
        }

        setIsModalOpen(true);
        setIsSuccessMessage(false);
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    const { nickname, newPassword } = data;

    // 유효성 검사: 최소 하나의 필드가 유효한 경우
    if (!nickname && !newPassword) {
      console.log('변경된 정보가 없습니다.');
      return;
    }

    const registerData: registerDataType = {
      nickname: nickname !== userInfo?.nickname ? nickname : undefined,
      newPassword: newPassword || undefined,
    };

    mutation.mutate(registerData);
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    if (isSuccessMessage) router.push('/activities');
  };

  return (
    <div className="mb-70 h-fit">
      <div className="mb-30 flex w-full items-center justify-between">
        <h1 className="text-3xl-bold">내 정보</h1>
        <Button
          type="submit"
          className="max-w-120 rounded-md py-12"
          onClick={handleSubmit(onSubmit)}
        >
          저장하기
        </Button>
      </div>
      <form className="flex flex-col gap-24" onSubmit={handleSubmit(onSubmit)}>
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
          disabled={true}
        />
        <Input
          label="비밀번호 재설정"
          name="newPassword"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          register={register('newPassword')}
          error={errors.newPassword}
          maxWidth="792px"
          onBlur={() => trigger('newPassword')}
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
      </form>
    </div>
  );
}
