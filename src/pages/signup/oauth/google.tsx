import { notify } from '@/components/commons/Toast';
import { SignUpUser } from '@/libs/api/oauth';
import { randomNickname } from '@/libs/utils/randomNickname';
import { SignInResponse, SignUpRequest } from '@trip.zip-api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GOOGLE_SIGNUP_REDIRECT_URI =
  process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_REDIRECT_URI;

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
                redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI || '',
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

          console.log(tokenResponse);
          console.log(googleAccessToken);

          const signUpData: SignUpRequest = {
            nickname: randomNickname(),
            redirectUri: GOOGLE_SIGNUP_REDIRECT_URI,
            token: googleAccessToken,
          };

          const signInResponse: SignInResponse = await SignUpUser(
            'google',
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

  return <div>{loading ? <p>로딩 중...</p> : <p>구글 회원가입 완료!</p>}</div>;
}
