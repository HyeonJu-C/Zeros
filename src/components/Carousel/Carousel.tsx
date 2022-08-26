import React from "react";
import { GrPrevious as PreviousIcon, GrNext as NextIcon } from "react-icons/gr";
import useCarousel from "../../hooks/useCarousel";
import styles from "./Carousel.module.css";

export interface CarouselContents {
  index: number;
  title: string | React.ReactNode;
  paragraph: string | React.ReactNode;
  image?: string;
  alt?: string;
}
interface Props {
  contents: CarouselContents[];
  children?: React.ReactNode;
}

function Carousel({ contents, children }: Props) {
  const [currentIndex, onClickPrev, onClickNext] = useCarousel(3);
  const currentContents = contents.filter(
    ({ index }) => index === currentIndex
  );

  return (
    <article className={styles.carousel}>
      {currentContents.map(({ title, paragraph, image, alt }) => (
        <>
          <h2>{title}</h2>
          <p>{paragraph}</p>
          {image && <img className={styles.image} src={image} alt={alt} />}
        </>
      ))}
      <button
        type="button"
        className={`${styles.button} ${styles.previous}`}
        onClick={onClickPrev as React.MouseEventHandler}
      >
        <span className="sr-only">previous</span>
        <PreviousIcon />
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.next}`}
        onClick={onClickNext as React.MouseEventHandler}
      >
        <span className="sr-only">next</span>
        <NextIcon />
      </button>
      {children}
    </article>
  );
}

export default Carousel;
