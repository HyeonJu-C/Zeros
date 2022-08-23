/* eslint-disable jsx-a11y/click-events-have-key-events */
import { differenceInDays, format, isAfter } from "date-fns";
import React, { MouseEventHandler, useState } from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import { HiPencilAlt as PencilIcon } from "react-icons/hi";
import { Link } from "react-router-dom";
import Modal, { ModalState } from "../../../components/Modal/Modal";
import { auth } from "../../../services/firebase/config";
import { deleteGoal, GoalData } from "../../../services/firebase/database";
import styles from "./GoalCard.module.css";
import ToastMessage, {
  ToastMessageState,
} from "../../../components/ToastMessage/ToastMessage";

interface Props {
  data: GoalData;
}

function GoalCard({ data }: Props) {
  const [isDeleted, setIsDeleted] = useState(false);

  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });
  const {
    isVisible: isModalVisible,
    title: modalTitle,
    message: modalMessage,
  } = modal;

  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });
  const {
    isVisible: isToastMessageVisible,
    title: toastMessageTitle,
    message: toastMessageContents,
  } = toastMessage;

  const now = new Date();
  const { userName, processedGoalSavings, acheiveRate, targetDate, uid, id } =
    data;

  const isAuthorized = auth.currentUser?.uid === uid;
  const isOutdated = isAfter(now, targetDate as Date);
  const leftDays = differenceInDays(targetDate as Date, now);
  const formattedTargetDate = format(targetDate as Date, "yyyy년 MM월 dd일");

  const onClickDelete = () => {
    setModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onConfirmDelete = async () => {
    setModal({ isVisible: false });
    await deleteGoal(id as string);
    setToastMessage({
      isVisible: true,
      title: "Delete",
      message: "삭제되었습니다.",
    });
    setIsDeleted(true);
  };

  const onCancelDelete = () => {
    setModal({ isVisible: false });
  };

  const onClickSave: MouseEventHandler<HTMLElement> = (event) => {
    if (!isOutdated) return;

    event.preventDefault();
    setToastMessage({
      isVisible: true,
      title: "Fail",
      message:
        "목표 기한이 지나 저축할 수 없습니다. 새로운 목표를 만들거나, 기한을 조정해 주세요.",
    });
  };

  return (
    <>
      {!isDeleted && (
        <article className={`${styles.card} `}>
          <h1 className={styles.author}>{`${userName} 님의 저축 목표`}</h1>
          <section className={styles.goalContainer}>
            <div className={styles.iconContainer}>
              <MoneyIcon color="#64c2a8" size="80%" />
            </div>
            <div className={styles.goal}>
              <h2>Goals</h2>
              <p>{`목표금액은 ${processedGoalSavings} 만원 입니다.`}</p>
              <p>{`목표 기한은 ${formattedTargetDate} 입니다.`}</p>
            </div>
            {isAuthorized && (
              <button type="button" className={styles.patch}>
                <span className="sr-only">수정하기</span>
                <PencilIcon size={20} />
              </button>
            )}
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
                (acheiveRate as number) >= 100 ? <ConfettiIcon /> : ""
              }`}</span>
              <span
                className={styles.hilight}
              >{`목표 기한까지 ${leftDays} 일`}</span>
            </strong>
          </section>
          {isAuthorized && (
            <section className={styles.buttonContainer}>
              <Link
                onClick={onClickSave}
                to={id as string}
                className={`${styles.save} ${
                  isOutdated ? styles.outdated : ""
                }`}
              >
                저축하기
              </Link>
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
          title={modalTitle}
          message={modalMessage}
          setModal={setModal}
          onCancelClick={onCancelDelete}
          onConfirmClick={onConfirmDelete}
        />
      )}
      {isToastMessageVisible && (
        <ToastMessage
          title={toastMessageTitle as string}
          message={toastMessageContents as string}
          isMessageVisible={isToastMessageVisible}
          setToastMessage={setToastMessage}
        />
      )}
    </>
  );
}

export default GoalCard;
