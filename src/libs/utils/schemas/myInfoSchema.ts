import * as yup from 'yup';

export const myInfoSchema = yup.object().shape({
  nickname: yup.string().required('닉네임을 입력해 주세요.'),
  email: yup
    .string()
    .email('유효한 이메일을 입력해 주세요.')
    .required('이메일을 입력해 주세요.'),
  newPassword: yup
    .string()
    .test('min-length', '비밀번호는 최소 8자 이상이어야 합니다.', (value) => {
      if (!value) return true; // 비어 있을 경우 유효성 검사 통과
      return value.length >= 8;
    })
    .test(
      'valid-password',
      '비밀번호는 소문자, 숫자, 특수문자를 포함해야 하며 공백을 포함할 수 없습니다.',
      (value) => {
        if (!value) return true; // 비어 있을 경우 유효성 검사 통과

        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasNoWhitespace = /^\S*$/.test(value);

        return hasLowercase && hasNumber && hasSpecialChar && hasNoWhitespace;
      },
    )
    .nullable()
    .notRequired(),
  reEnterPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.')
    .nullable()
    .notRequired(),
});
