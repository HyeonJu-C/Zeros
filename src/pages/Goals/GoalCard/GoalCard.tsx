import { format, parseJSON } from "date-fns";
import React from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { auth } from "../../../services/firebase/config";
import { GoalData } from "../../../services/firebase/database";
import styles from "./GoalCard.module.css";

interface Props {
  data: GoalData;
}

function GoalCard({ data }: Props) {
  const { userName, goalSavings, targetDate, currentSavings, uid } = data;

  const isAuthorized = auth.currentUser?.uid === uid;
  const acheiveRate =
    (+(currentSavings as string) / +(goalSavings as string)) * 100;

  const formattedDate = format(
    parseJSON(targetDate as string),
    "yyyy년 MM월 dd일"
  );

  return (
    <article className={styles.card}>
      <h1 className={styles.author}>{`${userName} 님의 저축 목표`}</h1>
      <section className={styles.goalContainer}>
        <div className={styles.iconContainer}>
          <MoneyIcon color="#64c2a8" size="80%" />
        </div>
        <div className={styles.goal}>
          <h2>Goals</h2>
          <p>{`목표금액은 ${goalSavings}원 입니다.`}</p>
          <p>{`목표 기한은 ${formattedDate} 입니다.`}</p>
        </div>
      </section>
      <section className={styles.barContainer}>
        <strong
          className={styles.currentGoal}
        >{`목표 달성률 ${acheiveRate}%`}</strong>
        <div className={styles.parentBar}>
          <div
            className={styles.childBar}
            style={{ width: `${acheiveRate}%` }}
          />
        </div>
      </section>

      {isAuthorized && (
        <>
          <button type="button">rewrite</button>
          <button type="button">delete</button>
        </>
      )}
    </article>
  );
}

export default GoalCard;
