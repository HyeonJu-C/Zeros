/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  RiDeleteBinLine as DeleteIcon,
  RiHandCoinLine as CoinIcon,
} from "react-icons/ri";
import GoalsService from "../../services/firebase/goals-database";
import { GoalData } from "../../types/goals";
import styles from "./My.module.css";
import GoalPresenter from "../../utils/goal-presenter";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import useToastMessage from "../../hooks/useToastMessage";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import SaveMoneyForm from "./SaveMoneyForm/SaveMoneyForm";

export enum Mode {
  DEFAULT = "DEFAULT",
  SAVE_MONEY = "SAVE_MONEY",
}
interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}

function My({ goalsService, goalsPresenter }: Props) {
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState<GoalData[] | null>(null);
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);
  const clickedGoalId = useRef<null | string>(null);
  const { modal, setModal, onClickBackground, onClickCancel } = useModal();
  const { toastMessage, setToastMessage } = useToastMessage();

  const onClickSaveMoney = (id: string) => {
    clickedGoalId.current = id;

    mode === Mode.DEFAULT && setMode(Mode.SAVE_MONEY);
    mode === Mode.SAVE_MONEY && setMode(Mode.DEFAULT);
  };

  const onClickDelete = (id: string) => {
    clickedGoalId.current = id;

    setModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onConfirmDelete = () => {
    setModal((prev) => ({ ...prev, isVisible: false }));

    goalsService
      .deleteGoalById(clickedGoalId.current!) //
      .then(() => {
        setToastMessage({
          isVisible: true,
          title: "Success",
          message: "삭제되었습니다",
        });
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await goalsService.getGoalsByUserId(userId!);
      setData(response as GoalData[]);
    };

    getData();
  }, [goalsService, userId, toastMessage]);

  return (
    <>
      <Modal
        modal={modal}
        onClickBackground={onClickBackground}
        onCancelClick={onClickCancel}
        onConfirmClick={onConfirmDelete}
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
                        className={`${styles.button} ${styles.save}`}
                        type="button"
                        onClick={() => onClickSaveMoney(id!)}
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
                  {mode === Mode.SAVE_MONEY && id === clickedGoalId.current && (
                    <SaveMoneyForm
                      goalsPresenter={goalsPresenter}
                      goalsService={goalsService}
                      clickedGoalId={clickedGoalId.current}
                      setToastMessage={setToastMessage}
                      setMode={setMode}
                    />
                  )}
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
