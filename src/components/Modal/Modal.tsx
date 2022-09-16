/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import ReactDOM from "react-dom";
import { ModalState } from "../../hooks/useModal";
import styles from "./Modal.module.css";

interface Props {
  onClickBackground: React.MouseEventHandler;
  modal: ModalState;
  hideButtons?: boolean;
  onConfirmClick?: React.MouseEventHandler;
  onCancelClick?: React.MouseEventHandler;
}

function Modal({
  modal,
  hideButtons,
  onClickBackground,
  onConfirmClick,
  onCancelClick,
}: Props) {
  const { title, message, isVisible } = modal;
  return ReactDOM.createPortal(
    isVisible ? (
      <aside>
        <div className={styles.background} onClick={onClickBackground} />
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
      </aside>
    ) : null,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
