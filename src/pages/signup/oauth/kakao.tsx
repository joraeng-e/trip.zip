import { SignUpUser } from '@/libs/api/oauth';
import { randomNickname } from '@/libs/utils/randomNickname';
import { SignInResponse, SignUpRequest } from '@trip.zip-api';
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

          router.push('/activities');
        } catch (error) {
          console.error('회원가입 오류:', error);
        }
      }
    };

    handleOAuthCallback();
  }, [router.query]);

  return (
    <div>{loading ? <p>로딩 중...</p> : <p>카카오 회원가입 중...</p>}</div>
  );
}
