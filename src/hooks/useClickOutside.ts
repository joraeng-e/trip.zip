import { useEffect } from 'react';

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

/**
 * isOpen 속성을 가진 컴포넌트가 렌더링 되어 있을 때 컴포넌트 외부 영역 클릭을 감지
 * @param ref - useRef를 사용해 ref객체 생성
 * @param handler - 외부클릭이 발생하였을 때 실행할 handler 함수 또는 dispatcher
 * @example
 * ```
 * /index.tsx
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * useClickOutside(dropdownRef, () => setIsOpen(false));
 *
 * <DropdownContext.provider>
 *  <div ref={dropDownRef}>
 *   {children}
 *  </div>
 * </DropdownContext.provider>
 * ```
 * 컴포넌트 최상위 요소에 ref를 지정 해주면 됩니다!
 * @author Adam
 */
export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: ClickOutsideHandler,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
