import { differenceInDays, format, parseJSON } from "date-fns";
import React, { useState } from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import Modal from "../../../components/Modal/Modal";
import { auth } from "../../../services/firebase/config";
import { deleteGoal, GoalData } from "../../../services/firebase/database";
import styles from "./GoalCard.module.css";

interface Props {
  data: GoalData;
}

function GoalCard({ data }: Props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { userName, goalSavings, targetDate, currentSavings, uid, id } = data;

  const isAuthorized = auth.currentUser?.uid === uid;

  const parsedDate = parseJSON(targetDate as string);
  const formattedTargetDate = format(parsedDate, "yyyy년 MM월 dd일");
  const leftDays = differenceInDays(parsedDate, new Date());

  const formattedGoalSavings = (
    +(goalSavings as string) / 10000
  ).toLocaleString("en-US");

  const acheiveRate =
    (+(currentSavings as string) / +(goalSavings as string)) * 100;

  const onClickDelete = () => {
    setModalVisible(true);
  };

  const onCancelDelete = () => {
    setModalVisible(false);
  };

  const onConfirmDelete = async () => {
    setModalVisible(false);
    await deleteGoal(id as string);
    setIsDeleted(true);
  };

  return (
    <>
      {!isDeleted && (
        <article className={styles.card}>
          <h1 className={styles.author}>{`${userName} 님의 저축 목표`}</h1>
          <section className={styles.goalContainer}>
            <div className={styles.iconContainer}>
              <MoneyIcon color="#64c2a8" size="80%" />
            </div>
            <div className={styles.goal}>
              <h2>Goals</h2>
              <p>{`목표금액은 ${formattedGoalSavings} 만원 입니다.`}</p>
              <p>{`목표 기한은 ${formattedTargetDate} 입니다.`}</p>
            </div>
          </section>
          <section className={styles.barContainer}>
            <h2>Acheive Rate</h2>
            <div className={styles.parentBar}>
              <div
                className={styles.childBar}
                style={{ width: `${acheiveRate}%` }}
              />
            </div>
            <strong className={styles.currentGoal}>
              <span>{`${acheiveRate}% 달성 ${
                acheiveRate >= 100 ? <ConfettiIcon /> : ""
              }`}</span>
              <span
                className={styles.hilight}
              >{`목표 기한까지 ${leftDays} 일`}</span>
            </strong>
          </section>
          {isAuthorized && (
            <section className={styles.buttonContainer}>
              <button type="button" className={styles.save}>
                저축하기
              </button>
              <button
                type="button"
                onClick={onClickDelete}
                className={styles.delete}
              >
                삭제하기
              </button>
            </section>
          )}
        </article>
      )}
      {isModalVisible && (
        <Modal
          title="Delete"
          message="이 저축 목표를 삭제하시겠습니까?"
          setModalVisible={setModalVisible}
          onCancelClick={onCancelDelete}
          onConfirmClick={onConfirmDelete}
        />
      )}
    </>
  );
}

export default GoalCard;
