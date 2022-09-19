/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { GoalData } from "../../../types/goals";
import GoalPresenter from "../../../presenter/goal-presenter";
import styles from "./Title.module.css";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function Title({ data, goalsPresenter }: Props) {
  const { userName, goalTitle, currentMoney, goalDate } = data;
  const goalStartDay = currentMoney![0].date;
  const formattedGoalStart = goalsPresenter.formatGoalDate(
    goalStartDay,
    "yyyy.M.d"
  );
  const formattedGoalEnd = goalsPresenter.formatGoalDate(goalDate!, "yyyy.M.d");

  return (
    <>
      <h2 className={styles.title}>{`${userName} 님의 ${goalTitle}`}</h2>
      <p
        className={styles.date}
      >{`${formattedGoalStart} ~ ${formattedGoalEnd}`}</p>
    </>
  );
}

export default Title;
