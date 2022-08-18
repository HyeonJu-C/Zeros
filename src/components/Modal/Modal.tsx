/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Dispatch, SetStateAction } from "react";
import styles from "./Modal.module.css";

interface Props {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  message?: string;
  onConfirmClick?: () => void;
  onCancelClick?: () => void;
}

function Modal({
  message,
  setModalVisible,
  onConfirmClick,
  onCancelClick,
}: Props) {
  const onBackgroundClick = () => {
    setModalVisible(false);
  };

  return (
    <aside>
      <div className={styles.background} onClick={onBackgroundClick} />
      <section className={styles.modal}>
        <p>{message}</p>
        <button type="button" onClick={onConfirmClick}>
          확인
        </button>
        <button type="button" onClick={onCancelClick}>
          취소
        </button>
      </section>
    </aside>
  );
}

export default Modal;
