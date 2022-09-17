import React from "react";
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
}

export default LoadingSpinner;
