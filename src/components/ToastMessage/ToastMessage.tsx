import React, { Dispatch, SetStateAction } from "react";
import styles from "./ToastMessage.module.css";

export interface ToastMessageState {
  isVisible: boolean;
  title?: string;
  message?: string;
}

interface Props {
  title: string;
  message: string;
  isMessageVisible: boolean;
  setToastMessage: Dispatch<SetStateAction<ToastMessageState>>;
  visibleDuration?: number;
  onDisappearMessage?: () => void; // do something after the message disappear
}

function ToastMessage({
  title,
  message,
  isMessageVisible,
  setToastMessage,
  visibleDuration,
  onDisappearMessage,
}: Props) {
  isMessageVisible &&
    setTimeout(() => {
      setToastMessage((prev) => ({
        ...prev,
        isVisible: false,
      }));
      onDisappearMessage && onDisappearMessage();
    }, visibleDuration || 2000);

  return isMessageVisible ? (
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
