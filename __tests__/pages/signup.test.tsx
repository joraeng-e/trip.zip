import Signup from '@/pages/signup';
import { useMutation } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// useMutation을 모킹해 실제 API 호출 방지
jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

describe('회원가입 페이지', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('폼이 올바르게 제출되는지 확인', async () => {
    render(<Signup />);

    fireEvent.input(screen.getByLabelText(/이메일/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/닉네임/i), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByPlaceholderText('8자 이상 입력해 주세요'), {
      target: { value: 'password123!' },
    });
    fireEvent.input(
      screen.getByPlaceholderText('비밀번호를 한번 더 입력해 주세요'),
      {
        target: { value: 'password123!' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /회원가입 하기/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'test@example.com',
        nickname: 'testuser',
        password: 'password123!',
      });
    });
  });

  test('유효성 검사 오류 메시지 표시', async () => {
    render(<Signup />);

    fireEvent.click(screen.getByRole('button', { name: /회원가입 하기/i }));

    expect(
      await screen.findByText(/이메일은 필수입니다./i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/닉네임은 필수입니다./i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/8자 이상 입력해주세요./i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/비밀번호 확인은 필수입니다./i),
    ).toBeInTheDocument();
  });

  test('비밀번호 불일치 시 오류 메시지 표시', async () => {
    render(<Signup />);

    fireEvent.input(screen.getByPlaceholderText('8자 이상 입력해 주세요'), {
      target: { value: 'password123!' },
    });
    fireEvent.input(
      screen.getByPlaceholderText('비밀번호를 한번 더 입력해 주세요'),
      {
        target: { value: 'differentpassword123!' },
      },
    );
    fireEvent.click(screen.getByRole('button', { name: /회원가입 하기/i }));

    expect(
      await screen.findByText(/비밀번호가 일치하지 않습니다/i),
    ).toBeInTheDocument();
  });
});
