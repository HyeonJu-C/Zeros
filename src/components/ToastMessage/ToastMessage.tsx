import React, { Dispatch, SetStateAction } from "react";
import styles from "./ToastMessage.module.css";

interface Props {
  title: string;
  message: string;
  isMessageVisible: boolean;
  setMessageVisible: Dispatch<SetStateAction<boolean>>;
  visibleDuration?: number;
  callback?: () => void; // do something after the message disappear
}

function ToastMessage({
  title,
  message,
  isMessageVisible,
  setMessageVisible,
  visibleDuration,
  callback,
}: Props) {
  isMessageVisible &&
    setTimeout(() => {
      setMessageVisible(false);
      callback && callback();
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
