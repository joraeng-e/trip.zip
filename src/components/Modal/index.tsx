import Close from './Close';
import Content from './Content';
import Description from './Description';
import Root from './Root';
import Title from './Title';
import Trigger from './Trigger';

/**
 * @example
 * ```tsx
 * import Modal from '@/components/Modal';
 * 
 * export default function ModalEx() {
 *  
 *  return (
 *    <>
      <Modal.Root>
        <Modal.Trigger>modal trigger</Modal.Trigger>
        <Modal.Content popover icon>
          <Modal.Title>제목</Modal.Title>
          <Modal.Description>내용</Modal.Description>
          <Modal.Close
            onConfirm={() => console.log('Button Clicked!')}
            confirm
          >
            예
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
 *    </>
 *  )
 * }
 * ```
 * - 모든 param은 안 넣어도 됩니다.
 * @param popover - 팝오버 형식으로 띄울 수 있습니다. overlay가 없어지고, 해당 트리거 바로 밑에 나타납니다.
 * @param {void} onConfirm - 모달 버튼에 넣을 함수입니다.
 * @param confirm - 아니오 버튼을 하나 더 나타냅니다. 아니오 버튼은 모달을 닫는 기능만 존재합니다.
 * @param {string} className - tailwind css를 위한 클래스 네임을 추가할 수 있습니다.
 * 
 * - Title, Description, Close 안 넣어도 됩니다.
 * 
 * @author 배영준
 */

const Modal = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
};

export default Modal;
