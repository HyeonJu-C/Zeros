import { differenceInDays } from "date-fns";
import React from "react";
import { GoalData, SavedMoney } from "../../../types/goals";
import {
  calculateAcheiveRate,
  formatAcheiveRate,
  parseGoalDate,
} from "../../../utils/format-goal-data";
import styles from "./AchieveRate.module.css";

interface Props {
  data: GoalData;
}

function AchieveRate({ data }: Props) {
  const { goalDate, goalMoney, currentMoney } = data;

  const now = new Date();
  const parsedGoalDate = parseGoalDate(goalDate as string);
  const leftDays = differenceInDays(parsedGoalDate, now);

  const formattedAcheiveRate = formatAcheiveRate(
    calculateAcheiveRate(currentMoney as SavedMoney[], goalMoney as number)
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
