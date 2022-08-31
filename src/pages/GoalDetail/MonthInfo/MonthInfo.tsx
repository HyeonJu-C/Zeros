import { isSameMonth, parseJSON, parse, format } from "date-fns";
import React from "react";
import { SavedMoney } from "../../../services/firebase/goals-database";
import {
  calculateAcheiveRate,
  formatGoalMoney,
} from "../../../utils/format-goal-data";
import styles from "./MonthInfo.module.css";

interface Props {
  currentMoney: SavedMoney[];
  currentMonth: string;
  goalMoney: number;
}

function MonthInfo({ currentMoney, currentMonth, goalMoney }: Props) {
  const parsedCurrentMonth = parse(currentMonth, "yyyy MMM", new Date());

  const moneyListOnCurrentMonth = currentMoney //
    .filter((money) =>
      isSameMonth(parsedCurrentMonth, parseJSON(money.date as string))
    );

  const totalMoneyOnCurrentMonth = moneyListOnCurrentMonth //
    .map((moneyItem) => moneyItem.money) //
    .reduce((prev, current) => prev + current, 0);

  const formattedTotalMoney = formatGoalMoney(
    totalMoneyOnCurrentMonth.toString()
  );

  const acheiveRateOnCurrentMonth = calculateAcheiveRate(
    moneyListOnCurrentMonth,
    goalMoney
  );

  return (
    <section className={styles.monthInfo}>
      <h2 className={styles.title}>{`${format(
        parsedCurrentMonth,
        "yyyy년 M월"
      )} 저축 현황`}</h2>
      {totalMoneyOnCurrentMonth > 0 ? (
        <>
          <p
            className={styles.p}
          >{`총 ${formattedTotalMoney}을 저축했습니다.`}</p>
          <p className={styles.p}>{`전체 목표의 약 ${Math.round(
            acheiveRateOnCurrentMonth
          )}%를 저축 했습니다. `}</p>
        </>
      ) : (
        <p>저축한 금액이 없습니다.</p>
      )}
    </section>
  );
}

export default MonthInfo;
