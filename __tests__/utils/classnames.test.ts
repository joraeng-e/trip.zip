/* eslint-disable prefer-const */
import classNames from '@/libs/utils/classNames';

describe('classNames 유틸 함수 테스트', () => {
  it('기본 Tailwind  테스트', () => {
    const result = classNames('rounded-8', {
      'bg-white': true,
      'bg-black': false,
    });

    expect(result).toBe('rounded-8 bg-white');
  });

  it('조건부 Tailwind  테스트', () => {
    const cancel = false;
    const result = classNames('rounded-8', {
      'bg-white border border-gray-200 text-gray-400 hover:bg-gray-200 hover:text-white':
        cancel,
      'bg-toss-blue text-white hover:bg-toss-blue/95 disabled:bg-gray-200':
        !cancel,
    });

    expect(result).toBe(
      'rounded-8 bg-toss-blue text-white hover:bg-toss-blue/95 disabled:bg-gray-200',
    );
  });

  it('Size 테스트', () => {
    let size = 'xs';

    const result = classNames('rounded-full', 'bg-blue', {
      'size-6': size === 'xs',
      'size-8': size === 'sm',
      'size-30': size === 'lg',
    });

    expect(result).toBe('rounded-full bg-blue size-6');
  });

  it('매개 변수 순서 테스트', () => {
    let size = 'xs';

    const result = classNames(
      'rounded-full',
      {
        'size-6': size === 'xs',
        'size-8': size === 'sm',
        'size-30': size === 'lg',
      },
      'bg-blue',
    );

    expect(result).toBe('rounded-full size-6 bg-blue');
  });

  it('다이나믹 className 테스트', () => {
    let buttonType = 'primary';
    const result = classNames({ [`btn-${buttonType}`]: true });
    expect(result).toBe('btn-primary');
  });

  it('메모이제이션 테스트', () => {
    const generateComplexArgs = (count: number) => {
      const classes = [];
      for (let i = 0; i < count; i++) {
        classes.push(`class-${i}`);
        classes.push({ [`dynamic-class-${i}`]: i % 2 === 0 });
      }
      return classes;
    };

    const args = generateComplexArgs(1000);

    const startOneExecution = performance.now();
    classNames(...args);
    const endOneExecution = performance.now();
    const oneExecutionTime = endOneExecution - startOneExecution;

    const startTwoExecutions = performance.now();
    classNames(...args);
    const endTwoExecutions = performance.now();
    const twoExecutionsTime = endTwoExecutions - startTwoExecutions;

    console.log(`One Execution Time: ${oneExecutionTime} ms`);
    console.log(`Two Executions Time: ${twoExecutionsTime} ms`);

    expect(twoExecutionsTime).toBeLessThanOrEqual(oneExecutionTime);
  });
});
