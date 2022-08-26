import React from "react";
import Carousel, {
  CarouselContents,
} from "../../../components/Carousel/Carousel";
import styles from "./Explanation.module.css";
import goalImage from "../../../assets/images/money_goal_mobile.png";
import zeroImage from "../../../assets/images/zero-landing.jpg";
import loginImage from "../../../assets/images/login.jpg";
import writeImage from "../../../assets/images/write.jpg";

const PAGE_EXPLANATION_CONTENTS: CarouselContents[] = [
  {
    index: 0,
    title: "Welcome!",
    subtitle: "This is Zeros Project",
    paragraph: "Zeros는 우리 모두의 통장에 0이 많아지길 바라며 시작되었습니다.",
    image: zeroImage,
    alt: "숫자 0 모양의 촛불",
  },
  {
    index: 1,
    title: "Read",
    subtitle: "Everyone's Goals",
    paragraph: "다른 사람들의 저축 목표와 목표 달성도를 확인해 보세요.",
    image: goalImage,
    alt: "zeros 저축 목표 예시",
  },
  {
    index: 2,
    title: "Create",
    subtitle: "and Share Your Goal",
    paragraph: "당신도 저축 목표를 만들고 사람들과 공유할 수 있습니다.",
    image: writeImage,
    alt: "노트에 글을 작성 중인 사람의 손",
  },
  {
    index: 3,
    title: "Login",
    subtitle: "with Google or Github",
    paragraph: "지금 로그인해서 서비스를 이용해 보세요!",
    image: loginImage,
    alt: "휴대폰을 만지고 있는 사람의 손",
  },
];

function Explanation() {
  return (
    <section className={styles.explanation}>
      <Carousel contents={PAGE_EXPLANATION_CONTENTS} autoplay duration={5000} />
    </section>
  );
}

export default Explanation;
