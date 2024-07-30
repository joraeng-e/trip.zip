import Button from '@/components/Button';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/libs/utils/Icon', () => ({
  PaperPlaneIcon: ({
    width,
    height,
    className,
  }: {
    width: number;
    height: number;
    className: string;
  }) => (
    <svg
      width={width}
      height={height}
      className={className}
      data-testid="paperPlaneIcon"
    ></svg>
  ),
}));

describe('Button Component', () => {
  it('props로 전달한 값이 제대로 반영 되는가?', () => {
    render(
      <Button
        variant="inactiveButton"
        hasICon={true}
        className="w-100"
        onClick={() => {}}
      >
        테스트하기
      </Button>,
    );

    const buttonElement = screen.getByText('테스트하기');
    const iconElement = screen.getByTestId('paperPlaneIcon');

    // 버튼의 상태에 따른 변화
    expect(buttonElement).toHaveClass('inactiveButton');
    expect(buttonElement).toBeInTheDocument();

    // 추가 스타일 적용 클래스
    const parentElement = buttonElement.parentElement;
    expect(parentElement).toHaveClass('w-100');

    // 아이콘 유무
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('ml-6');
  });

  it('버튼을 클릭했을 때 이벤트가 제대로 동작되는가?', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭하기</Button>);

    const buttonElement = screen.getByText('클릭하기');
    fireEvent.click(buttonElement);

    // 이벤트가 동작하는지 테스트
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
