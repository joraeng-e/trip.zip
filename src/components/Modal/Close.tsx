import { PropsWithChildren } from 'react';

import { useModalContext } from './Root';

export default function ModalClose(props: PropsWithChildren) {
  const { children } = props;
  const { handleOpenChange } = useModalContext();

  const handleClickButton = () => {
    if (handleOpenChange) {
      handleOpenChange(false);
    }
  };

  return (
    <button
      onClick={handleClickButton}
      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
    >
      {children}
    </button>
  );
}
