import { format, isSameDay, parseJSON } from "date-fns";
import React from "react";
import { SavedMoney } from "../../../types/goals";
import GoalPresenter from "../../../utils/goal-presenter";
import styles from "./DateInfo.module.css";

interface Props {
  currentMoney: SavedMoney[];
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  goalsPresenter: GoalPresenter;
}

function DateInfo({
  currentMoney,
  currentDate,
  startDate,
  endDate,
  goalsPresenter,
}: Props) {
  const moneyListOnCurrentDate = currentMoney //
    .filter((moneyItem) => isSameDay(currentDate, parseJSON(moneyItem.date))) //
    .filter((moneyItem) => moneyItem.money !== 0);

  const totalMoneyOnCurrentDate = moneyListOnCurrentDate //
    ?.map((moneyItem) => moneyItem.money)
    ?.reduce((prev, current) => prev + current, 0);

  const formattedTotalMoney = goalsPresenter.formatMoney(
    totalMoneyOnCurrentDate
  );
  const formattedCurrentDate = format(currentDate, "yyyy년 M월 d일");

  return (
    <section className={styles.dateInfo}>
      <h2 className={styles.title}>{`${formattedCurrentDate} 저축 현황`}</h2>
      {isSameDay(currentDate, startDate) && (
        <h3 className={styles.subTitle}>목표를 세운 날짜 입니다.</h3>
      )}
      {isSameDay(currentDate, endDate) && (
        <h3 className={styles.subTitle}>목표 달성 계획일입니다.</h3>
      )}
      {totalMoneyOnCurrentDate > 0 ? (
        <p>{`${formattedTotalMoney}을 저축하였습니다.`}</p>
      ) : (
        <p>해당 일에 저축한 금액이 없습니다.</p>
      )}
    </section>
  );
}

export default DateInfo;
