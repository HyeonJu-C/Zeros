import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import styles from "./Explanation.module.css";

function Explanation() {
  return (
    <section className={styles.explanation}>
      <Carousel />
    </section>
  );
}

export default Explanation;
