/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface Props {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  onConfirmClick?: () => void;
  onCancelClick?: () => void;
}

function Modal({
  title,
  message,
  setModalVisible,
  onConfirmClick,
  onCancelClick,
}: Props) {
  const onBackgroundClick = () => {
    setModalVisible(false);
  };

  return ReactDOM.createPortal(
    <aside>
      <div className={styles.background} onClick={onBackgroundClick} />
      <section className={styles.modal}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
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
      </section>
    </aside>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
