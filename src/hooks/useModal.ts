import React, { useState } from "react";

export interface ModalState {
  isVisible: boolean;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
}

function useModal() {
  const [modal, setModal] = useState<ModalState>({ isVisible: false });

  const onClickBackground = () =>
    setModal((prev) => ({ ...prev, isVisible: false }));

  const onClickCancel: React.MouseEventHandler<Element> = () => {
    setModal((prev) => ({ ...prev, isVisible: false }));
  };

  return {
    modal,
    setModal,
    onClickBackground,
    onClickCancel,
  };
}

export default useModal;
