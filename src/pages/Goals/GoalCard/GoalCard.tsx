/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styles from "./GoalCard.module.css";

import GoalPresenter from "../../../presenter/goal-presenter";
import GoalInfo from "../GoalInfo/GoalInfo";
import AchieveRate from "../AchieveRate/AchieveRate";
import { GoalData } from "../../../types/goals";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function GoalCard({ data, goalsPresenter }: Props) {
  const navigate = useNavigate();
  const { id, userName, goalMoney, currentMoney } = data;

  const navigateToDetailPage: React.MouseEventHandler = () => {
    navigate(`${id}`);
  };

  const formattedAcheiveRate = goalsPresenter.formatAcheiveRate(
    currentMoney!,
    goalMoney!
  );
  const isGoalAcheived = +formattedAcheiveRate >= 100;

  return (
    <article className={`${styles.card} `}>
      <h1 className={styles.author}>
        {`${userName} 님의 저축 목표 `}
        {isGoalAcheived && <ConfettiIcon size={25} color="#e1b530" />}
      </h1>
      <GoalInfo data={data} goalsPresenter={goalsPresenter} />
      <AchieveRate data={data} goalsPresenter={goalsPresenter} />
      <button
        type="button"
        onClick={navigateToDetailPage}
        className={`${styles.button}`}
      >
        detail
      </button>
    </article>
  );
}

export default GoalCard;
