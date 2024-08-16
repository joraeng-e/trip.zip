import Loading from '@/components/commons/Loading';
import { notify } from '@/components/commons/Toast';
import { SignUpUser } from '@/libs/api/oauth';
import { randomNickname } from '@/libs/utils/randomNickname';
import { SignInResponse, SignUpRequest } from '@trip.zip-api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const KAKAO_SIGNUP_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;

export default function Kakao() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { code } = router.query;

      if (code) {
        try {
          const signUpData: SignUpRequest = {
            nickname: randomNickname(),
            redirectUri: KAKAO_SIGNUP_REDIRECT_URI,
            token: code as string,
          };

          const signInResponse: SignInResponse = await SignUpUser(
            'kakao',
            signUpData,
          );

          console.log('회원가입 성공:', signInResponse);
          notify('success', '회원가입 성공!');

          router.push('/activities');
        } catch (error) {
          console.error('회원가입 오류:', error);
          if (axios.isAxiosError(error) && error.response) {
            notify('error', error.response.data.message);
            if (error.response.data.message === '이미 등록된 사용자입니다.')
              router.push('/login');
          } else {
            notify('error', '회원가입 중 알 수 없는 오류가 발생했습니다.');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [router.query]);

  return <div>{loading && <Loading />}</div>;
}
