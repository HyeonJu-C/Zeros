import React, { Dispatch, SetStateAction } from "react";
import styles from "./ToastMessage.module.css";

interface Props {
  title: string;
  message: string;
  isMessageVisible: boolean;
  setMessageVisible: Dispatch<SetStateAction<boolean>>;
  visibleDuration?: number;
}

function ToastMessage({
  title,
  message,
  isMessageVisible,
  setMessageVisible,
  visibleDuration,
}: Props) {
  isMessageVisible &&
    setTimeout(() => setMessageVisible(false), visibleDuration || 2000);

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
