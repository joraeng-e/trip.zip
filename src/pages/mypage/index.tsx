import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import { notify } from '@/components/commons/Toast';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import ProfileImage from '@/components/mypage/ProfileImage';
import { getUser, patchUserInfo, postProfileImage } from '@/libs/api/user';
import { myInfoSchema } from '@/libs/utils/schemas/myInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PostProfileImageResponse } from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  nickname: string;
  email: string;
  newPassword?: string | null;
  reEnterPassword?: string | null;
  profileImageUrl?: string | null;
};

type registerDataType = {
  nickname?: string;
  newPassword?: string;
  profileImageUrl?: string | null;
};

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function Info() {
  const { data: userInfo, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    staleTime: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(myInfoSchema),
    mode: 'all',
  });

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState<File | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      reset({
        nickname: userInfo.nickname,
        email: userInfo.email,
        newPassword: '',
        reEnterPassword: '',
        profileImageUrl: userInfo.profileImageUrl,
      });
      setProfileImageUrl(userInfo.profileImageUrl || '');
    }
  }, [userInfo, reset]);

  // 이미지 POST
  const imgMutation = useMutation({
    mutationFn: postProfileImage,
    onSuccess: (res: PostProfileImageResponse) => {
      console.log('업로드 성공', res);
      const newProfileImageUrl = res.profileImageUrl;
      setProfileImageUrl(newProfileImageUrl);

      // 이미지 업로드 후 프로필 정보 업데이트
      updateProfileInfo({ profileImageUrl: newProfileImageUrl });
      refetch();
    },
    onError: (error) => {
      console.log('업로드 실패', error);
    },
  });

  // 프로필 정보 PATCH
  const mutation = useMutation({
    mutationFn: patchUserInfo,
    onSuccess: () => {
      setNewProfileImageFile(null);
      refetch();
      router.push('/mypage');
    },
    onError: (error: ApiError) => {
      if (error.response && error.response.data) {
        const message = error.response.data.message;

        switch (message) {
          case '수정할 내용이 없습니다.':
            notify('warning', '변경된 정보가 없습니다.');
            break;
          case '닉네임은 10자 이하로 작성해주세요.':
            notify('warning', '닉네임은 10자 이하로 작성해주세요.');
            break;
          default:
            console.error(error);
        }
      }
    },
  });

  const updateProfileInfo = (additionalData: registerDataType) => {
    const { nickname, newPassword } = getValues();

    const registerData: registerDataType = {
      nickname: nickname !== userInfo?.nickname ? nickname : undefined,
      newPassword: newPassword || undefined,
      profileImageUrl: additionalData.profileImageUrl || profileImageUrl,
    };

    mutation.mutate(registerData);
  };

  const onSubmit = async (data: FormData) => {
    const { nickname, newPassword, profileImageUrl } = data;

    if (
      nickname === userInfo?.nickname &&
      !newPassword &&
      !newProfileImageFile
    ) {
      notify('warning', '변경된 정보가 없습니다.');
    } else {
      notify('success', '수정 완료!');
    }

    // 이미지가 새로 업로드되는 경우
    if (newProfileImageFile) {
      const imageData = new FormData();
      imageData.append('image', newProfileImageFile);
      imgMutation.mutate(imageData);
    } else {
      // 이미지가 변경되지 않는 경우
      updateProfileInfo({ profileImageUrl });
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setNewProfileImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setProfileImageUrl(objectUrl);
      setValue('profileImageUrl', objectUrl);
    } else {
      setProfileImageUrl(null);
      setValue('profileImageUrl', null);
    }
  };

  const isSocialUser = getCookie('isSocialUser') === 'true';

  return (
    <MyPageLayout>
      <div className="mb-100 h-fit">
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
        <form
          className="flex flex-col-reverse gap-24 md:flex-row md:justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-24 md:flex-1">
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
              disabled={isSocialUser}
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
              disabled={isSocialUser}
            />
            {isSocialUser && (
              <p className="-mt-10 text-sm-medium text-custom-green-200 dark:text-custom-green-100">
                *소셜 로그인 유저는 닉네임과 프로필만 변경 가능합니다.
              </p>
            )}
          </div>

          <ProfileImage
            profileImageUrl={profileImageUrl}
            handleImageChange={handleImageChange}
          />
        </form>
      </div>
    </MyPageLayout>
  );
}
