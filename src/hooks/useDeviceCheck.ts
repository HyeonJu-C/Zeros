import { useEffect, useState } from "react";

function useDeviceCheck() {
  const [width, setWidth] = useState(window.innerWidth);
  const isDesktop = width >= 768;

  const onChangeWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onChangeWidth);
    return () => {
      window.removeEventListener("resize", onChangeWidth);
    };
  }, []);

  return { width, isDesktop };
}

export default useDeviceCheck;
