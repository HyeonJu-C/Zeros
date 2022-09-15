import React from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { GoalData } from "../../../types/goals";
import GoalPresenter from "../../../utils/goal-presenter";
import styles from "./GoalInfo.module.css";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function GoalInfo({ data, goalsPresenter }: Props) {
  const { goalDate, goalMoney, goalTitle } = data;

  const formattedGoalTitle = goalsPresenter.formatGoalTitle(
    goalTitle as string
  );

  const formattedGoalDate = goalsPresenter.formatGoalDate(goalDate as string);

  const formattedGoalMoney = goalsPresenter.formatMoney(goalMoney as number);

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
