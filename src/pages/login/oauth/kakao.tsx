import { signInUser } from '@/libs/api/oauth';
import { SignInRequest, SignInResponse } from '@trip.zip-api';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const KAKAO_LOGIN_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI || ''; // 기본값 설정

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

          router.push('/activities');
        } catch (error) {
          console.error('로그인 오류:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [router.query]);

  return <div>{loading ? <p>로딩 중...</p> : <p>카카오 로그인 완료!</p>}</div>;
}
