import React, { Dispatch, SetStateAction } from "react";
import { ToastMessageState } from "../../hooks/useToastMessage";
import styles from "./ToastMessage.module.css";

interface Props {
  toastMessage: ToastMessageState;
  setToastMessage: Dispatch<SetStateAction<ToastMessageState>>;
  visibleDuration?: number;
  onDisappearMessage?: (() => void) | null; // do something after the message disappear
}

function ToastMessage({
  toastMessage,
  setToastMessage,
  visibleDuration,
  onDisappearMessage,
}: Props) {
  const { isVisible, title, message } = toastMessage;
  isVisible &&
    setTimeout(() => {
      setToastMessage((prev) => ({
        ...prev,
        isVisible: false,
      }));
      onDisappearMessage && onDisappearMessage();
    }, visibleDuration || 2000);

  return isVisible ? (
    <>
      <div className={styles.background} />
      <aside className={styles.toastMessage}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
      </aside>
    </>
  ) : null;
}

export default ToastMessage;
