// 쿠키 설정 함수
export function setCookie(name: string, value: string, days?: number) {
  if (typeof document !== 'undefined') {
    const expires = days
      ? `; expires=${new Date(Date.now() + days * 30 * 60 * 1000).toUTCString()}`
      : '';
    document.cookie = `${name}=${value}${expires}; path=/`;
  }
}

// 쿠키 삭제 함수
export function deleteCookie(name: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

// 쿠키 읽기 함수
export function getCookie(name: string): string | null {
  if (typeof document !== 'undefined') {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      if (cookie.startsWith(nameEQ)) {
        return cookie.substring(nameEQ.length);
      }
    }
  }
  return null;
}

// 로그인 상태 확인 함수
export function isLogin(): boolean {
  const accessToken = getCookie('accessToken');
  return accessToken !== null;
}
