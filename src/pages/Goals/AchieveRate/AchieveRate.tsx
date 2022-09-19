/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { GoalData } from "../../../types/goals";
import GoalPresenter from "../../../presenter/goal-presenter";
import styles from "./AchieveRate.module.css";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function AchieveRate({ data, goalsPresenter }: Props) {
  const { goalDate, goalMoney, currentMoney } = data;

  const leftDays = goalsPresenter.calculateLeftDays(goalDate!);
  const formattedAcheiveRate = goalsPresenter.formatAcheiveRate(
    currentMoney!,
    goalMoney!
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
