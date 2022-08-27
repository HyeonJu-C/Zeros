/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export interface ModalState {
  isVisible: boolean;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
}

interface Props {
  setModal: Dispatch<SetStateAction<ModalState>>;
  modal?: ModalState;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  hideButtons?: boolean;
  onConfirmClick?: React.MouseEventHandler;
  onCancelClick?: React.MouseEventHandler;
}

function Modal({
  title,
  message,
  hideButtons,
  setModal,
  onConfirmClick,
  onCancelClick,
}: Props) {
  const onBackgroundClick = () => {
    setModal((prev) => ({ ...prev, isVisible: false }));
  };

  return ReactDOM.createPortal(
    <aside>
      <div className={styles.background} onClick={onBackgroundClick} />
      <section className={styles.modal}>
        <h1 className={styles.title}>{title}</h1>
        {typeof message === "string" ? (
          <p className={styles.message}>{message}</p>
        ) : (
          message
        )}
        {!hideButtons && (
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onConfirmClick}
              className={`${styles.button} ${styles.confirm}`}
            >
              확인
            </button>
            <button
              type="button"
              onClick={onCancelClick}
              className={`${styles.button} ${styles.cancel}`}
            >
              취소
            </button>
          </div>
        )}
      </section>
    </aside>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
