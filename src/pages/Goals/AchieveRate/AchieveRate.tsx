import React from "react";
import { GoalData, SavedMoney } from "../../../types/goals";
import GoalPresenter from "../../../utils/goal-presenter";
import styles from "./AchieveRate.module.css";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function AchieveRate({ data, goalsPresenter }: Props) {
  const { goalDate, goalMoney, currentMoney } = data;

  const leftDays = goalsPresenter.calculateLeftDays(goalDate as string);

  const formattedAcheiveRate = goalsPresenter.formatAcheiveRate(
    currentMoney as SavedMoney[],
    goalMoney as number
  );

  return (
    <section className={styles.barContainer}>
      <h2>Achieve Rate</h2>
      <div className={styles.parentBar}>
        <div
          className={styles.childBar}
          style={{ width: `${formattedAcheiveRate}%` }}
        />
      </div>
      <strong className={styles.currentGoal}>
        <span>{`${formattedAcheiveRate}% 달성 `}</span>
        <span className={styles.hilight}>{`목표 기한까지 ${leftDays} 일`}</span>
      </strong>
    </section>
  );
}

export default AchieveRate;
