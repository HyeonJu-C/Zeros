import { format, isSameDay, parseJSON } from "date-fns";
import React from "react";
import { SavedMoney } from "../../../services/firebase/goals-database";
import styles from "./MoneyInfo.module.css";

interface Props {
  currentMoney: SavedMoney[];
  currentDate: Date;
  startDate: Date;
  endDate: Date;
}

function MoneyInfo({ currentMoney, currentDate, startDate, endDate }: Props) {
  const moneyListOnCurrentDate = currentMoney //
    .filter((moneyItem) => isSameDay(currentDate, parseJSON(moneyItem.date))) //
    .filter((moneyItem) => moneyItem.money !== 0);

  const totalMoneyOnCurrentDate = moneyListOnCurrentDate //
    ?.map((moneyItem) => moneyItem.money)
    ?.reduce((prev, current) => prev + current, 0);

  return (
    <section className={styles.information}>
      <h2 className={styles.title}>{`${format(
        currentDate,
        "yyyy년 M월 dd일"
      )} 저축현황`}</h2>
      {isSameDay(currentDate, startDate) && (
        <h3 className={styles.subTitle}>목표를 세운 날짜 입니다.</h3>
      )}
      {isSameDay(currentDate, endDate) && (
        <h3 className={styles.subTitle}>목표 달성 계획일입니다.</h3>
      )}
      {totalMoneyOnCurrentDate !== 0 ? (
        <p>{`${totalMoneyOnCurrentDate.toLocaleString()} 원을 저축하였습니다.`}</p>
      ) : (
        <p>해당 일에 저축한 금액이 없습니다.</p>
      )}
    </section>
  );
}

export default MoneyInfo;
