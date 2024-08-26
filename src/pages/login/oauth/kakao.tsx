import Loading from '@/components/commons/Loading';
import { notify } from '@/components/commons/Toast';
import { signInUser } from '@/libs/api/oauth';
import { KAKAO_LOGIN_REDIRECT_URI } from '@/libs/constants/auth';
import { SignInRequest, SignInResponse } from '@trip.zip-api';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Kakao() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { code } = router.query;

      if (code) {
        try {
          const signInData: SignInRequest = {
            redirectUri: KAKAO_LOGIN_REDIRECT_URI,
            token: code as string,
          };

          const signInResponse: SignInResponse = await signInUser(
            'kakao',
            signInData,
          );
          console.log('로그인 성공:', signInResponse);
          notify('success', '로그인 성공!');

          setCookie('accessToken', signInResponse.accessToken, {
            path: '/',
            secure: true,
            sameSite: 'strict',
          });
          setCookie('refreshToken', signInResponse.refreshToken, {
            path: '/',
            secure: true,
            sameSite: 'strict',
          });
          setCookie('isSocialUser', true, {
            path: '/',
            secure: true,
            sameSite: 'strict',
          });

          router.push('/activities');
        } catch (error) {
          if (
            axios.isAxiosError(error) &&
            error.response &&
            error.response.status === 401
          ) {
            notify('warning', '계정이 없는 경우 회원가입을 진행해 주세요.');
            router.push('/signup');
          }
          console.error('로그인 오류:', error);
          notify('error', '로그인 중 알 수 없는 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [router.query]);

  return <div>{loading && <Loading />}</div>;
}
