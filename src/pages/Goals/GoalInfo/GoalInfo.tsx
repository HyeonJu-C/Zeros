/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { GoalData } from "../../../types/goals";
import GoalPresenter from "../../../presenter/goal-presenter";
import styles from "./GoalInfo.module.css";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function GoalInfo({ data, goalsPresenter }: Props) {
  const { goalDate, goalMoney, goalTitle } = data;

  const formattedGoalTitle = goalsPresenter.formatGoalTitle(goalTitle!);
  const formattedGoalDate = goalsPresenter.formatGoalDate(goalDate!);
  const formattedGoalMoney = goalsPresenter.formatMoney(goalMoney!);

  return (
    <section className={styles.goalContainer}>
      <div className={styles.iconContainer}>
        <MoneyIcon color="#64c2a8" size="85%" />
      </div>
      <div className={styles.goal}>
        <h2>{formattedGoalTitle}</h2>
        <p>{`목표금액은 ${formattedGoalMoney} 입니다.`}</p>
        <p>{`목표 기한은 ${formattedGoalDate} 입니다.`}</p>
      </div>
    </section>
  );
}

export default GoalInfo;
