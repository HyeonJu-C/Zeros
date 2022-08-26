import React, { useState } from "react";

function useCarousel(maxIndex: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickPrev: React.MouseEventHandler = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const onClickNext: React.MouseEventHandler = () => {
    if (currentIndex === maxIndex) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return [currentIndex, onClickPrev, onClickNext];
}

export default useCarousel;
