/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  RiDeleteBinLine as DeleteIcon,
  RiHandCoinLine as CoinIcon,
} from "react-icons/ri";
import { TbEdit as EditIcon } from "react-icons/tb";
import GoalsService from "../../services/firebase/goals-database";
import { GoalData } from "../../types/goals";
import styles from "./My.module.css";
import GoalPresenter from "../../utils/goal-presenter";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import useToastMessage from "../../hooks/useToastMessage";
import ToastMessage from "../../components/ToastMessage/ToastMessage";

interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}

function My({ goalsService, goalsPresenter }: Props) {
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState<GoalData[] | null>(null);
  const clickedGoalId = useRef<null | string>(null);
  const { modal, setModal, onClickBackground, onClickCancel } = useModal();
  const { toastMessage, setToastMessage } = useToastMessage();

  useEffect(() => {
    const getData = async () => {
      const response = await goalsService.getGoalsByUserId(userId as string);
      setData(response as GoalData[]);
    };

    getData();
  }, [goalsService, userId, toastMessage]);

  const onClickDelete = (id: string) => {
    clickedGoalId.current = id;

    setModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onClickConfirm = () => {
    setModal((prev) => ({ ...prev, isVisible: false }));

    switch (modal.title) {
      case "Delete":
        goalsService
          .deleteGoalById(clickedGoalId.current!) //
          .then(() => {
            setToastMessage({
              isVisible: true,
              title: "Success",
              message: "삭제되었습니다",
            });
          });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Modal
        modal={modal}
        onClickBackground={onClickBackground}
        onCancelClick={onClickCancel}
        onConfirmClick={onClickConfirm}
      />
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <section className="page-layout">
        <Link to="/goals/new" className={styles.link}>
          새로운 목표 만들기
        </Link>
        {data?.length === 0 && (
          <p className={styles.noGoal}>아직 만든 목표가 없어요!</p>
        )}
        {data && (
          <ul className={styles.goalContainer}>
            {data.map(
              ({ goalTitle, currentMoney, goalMoney, goalDate, id }) => (
                <li className={styles.goal} key={`my-goal-${id}`}>
                  <section className={styles.goalHeader}>
                    <div className={styles.titleContainer}>
                      <Link className={styles.goalTitle} to={`/goals/${id}`}>
                        {goalTitle}
                      </Link>
                      <p className={styles.goalDate}>
                        {goalsPresenter.formatGoalDate(goalDate!)}
                      </p>
                    </div>
                    <div className={styles.buttonContainter}>
                      <button
                        className={`${styles.button} ${styles.edit}`}
                        type="button"
                      >
                        <EditIcon />
                        <span className="sr-only">목표 수정하기</span>
                      </button>
                      <button
                        className={`${styles.button} ${styles.save}`}
                        type="button"
                      >
                        <CoinIcon />
                        <span className="sr-only">저축하기</span>
                      </button>
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        type="button"
                        onClick={() => onClickDelete(id!)}
                      >
                        <DeleteIcon />
                        <span className="sr-only">목표 삭제하기</span>
                      </button>
                    </div>
                  </section>
                  <section className={styles.goalFooter}>
                    <p className={styles.tag}>
                      {`D-${goalsPresenter.calculateLeftDays(goalDate!)}일`}
                    </p>
                    <p className={styles.tag}>
                      {goalsPresenter.formatMoney(goalMoney!)}
                    </p>
                    <p className={styles.tag}>
                      {`${goalsPresenter.formatAcheiveRate(
                        currentMoney!,
                        goalMoney!
                      )}% 달성`}
                    </p>
                  </section>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </>
  );
}

export default My;
