import Loading from '@/components/commons/Loading';
import { notify } from '@/components/commons/Toast';
import { signInUser } from '@/libs/api/oauth';
import { SignInRequest, SignInResponse } from '@trip.zip-api';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GOOGLE_LOGIN_REDIRECT_URI =
  process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI || '';

const GOOGLE_SECRET = process.env.NEXT_PUBLIC_GOOGLE_SECRET;

export default function Google() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { code } = router.query;

      if (code) {
        try {
          const getAccessToken = async (code: string) => {
            const response = await axios.post(
              'https://oauth2.googleapis.com/token',
              new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID || '',
                client_secret: GOOGLE_SECRET || '',
                redirect_uri: GOOGLE_LOGIN_REDIRECT_URI || '',
                grant_type: 'authorization_code',
              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            );

            return response.data;
          };

          const tokenResponse = await getAccessToken(code as string);
          const googleAccessToken = tokenResponse.id_token;

          const signInData: SignInRequest = {
            redirectUri: GOOGLE_LOGIN_REDIRECT_URI,
            token: googleAccessToken,
          };

          const signInResponse: SignInResponse = await signInUser(
            'google',
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
            notify(
              'warning',
              '계정이 없는 경우 회원가입을 진행해 주세요.',
              () => {
                router.push('/signup');
              },
            );
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
