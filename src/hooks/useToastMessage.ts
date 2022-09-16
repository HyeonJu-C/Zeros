import { useState } from "react";

export interface ToastMessageState {
  isVisible: boolean;
  title?: string;
  message?: string;
}

function useToastMessage() {
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });
  return { toastMessage, setToastMessage };
}

export default useToastMessage;
