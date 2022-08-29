/* eslint-disable consistent-return */
import React, { useEffect } from "react";
import { GrPrevious as PreviousIcon, GrNext as NextIcon } from "react-icons/gr";
import useCarousel from "../../hooks/useCarousel";
import styles from "./Carousel.module.css";

export interface CarouselContents {
  index: number;
  title: string | React.ReactNode;
  paragraph: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  image?: string;
  alt?: string;
}
interface Props {
  contents: CarouselContents[];
  autoplay?: boolean;
  duration?: number;
}

function Carousel({ contents, autoplay, duration }: Props) {
  const maxIndex = contents.length - 1;
  const [currentIndex, setCurrentIndex, onClickPrev, onClickNext] =
    useCarousel(maxIndex);

  const onClickNavigation = (index: number) => {
    if (index === currentIndex) return;
    (setCurrentIndex as React.Dispatch<React.SetStateAction<number>>)(index);
  };

  useEffect(() => {
    if (!autoplay) return;

    const autoplayTimer = setTimeout(() => {
      (onClickNext as () => void)();
    }, duration || 3000);

    return () => {
      clearTimeout(autoplayTimer);
    };
  }, [autoplay, duration, onClickNext]);

  return (
    <article className={`${styles.carousel}`}>
      {contents.map(({ index, title, subtitle, paragraph, image, alt }) => (
        <div
          key={`carousel_slide_${index}`}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : "sr-only"
          }`}
        >
          <section className={styles.titleContainer}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <h3 className={styles.title}>{subtitle}</h3>}
          </section>
          <section className={styles.imageContainer}>
            {image && <img className={styles.image} src={image} alt={alt} />}
          </section>
          {typeof paragraph === "string" ? <p>{paragraph}</p> : <>paragraph</>}
        </div>
      ))}
      <button
        type="button"
        className={`${styles.button} ${styles.previous}`}
        onClick={onClickPrev as unknown as React.MouseEventHandler}
      >
        <span className="sr-only">previous</span>
        <PreviousIcon />
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.next}`}
        onClick={onClickNext as unknown as React.MouseEventHandler}
      >
        <span className="sr-only">next</span>
        <NextIcon />
      </button>
      <div className={styles.navigationContainer}>
        {contents.map(({ index }) => (
          <button
            key={`carousel_navigation_${index}`}
            type="button"
            onClick={() => onClickNavigation(index)}
            className={`${styles.navigation} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <span className="sr-only">{`navigate to no.${
              index + 1
            } card`}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

export default Carousel;
