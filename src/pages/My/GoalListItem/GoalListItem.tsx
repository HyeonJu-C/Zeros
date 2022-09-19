/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiDeleteBinLine as DeleteIcon,
  RiHandCoinLine as CoinIcon,
} from "react-icons/ri";
import Modal from "../../../components/Modal/Modal";
import useModal from "../../../hooks/useModal";
import GoalsService from "../../../services/firebase/goals-database";
import { GoalData } from "../../../types/goals";
import GoalPresenter from "../../../presenter/goal-presenter";
import { Mode } from "../My";
import SaveMoneyForm from "../SaveMoneyForm/SaveMoneyForm";
import styles from "./GoalListItem.module.css";
import { ToastMessageState } from "../../../hooks/useToastMessage";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
  goalsService: GoalsService;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageState>>;
}

function GoalListItem({
  data,
  goalsPresenter,
  goalsService,
  setToastMessage,
}: Props) {
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);
  const clickedGoalId = useRef<null | string>(null);
  const {
    modal: deleteModal,
    setModal: setDeleteModal,
    onClickBackground,
    onClickCancel,
  } = useModal();

  const { goalTitle, goalDate, goalMoney, currentMoney, id } = data;

  const leftDays = goalsPresenter.calculateLeftDays(goalDate!);
  const formattedGoalTitle = goalsPresenter.formatGoalTitle(goalTitle!);
  const formattedMoney = goalsPresenter.formatMoney(goalMoney!);
  const formattedGoalDate = goalsPresenter.formatGoalDate(goalDate!);
  const formattedAchieveRate = goalsPresenter.formatAcheiveRate(
    currentMoney!,
    goalMoney!
  );

  const onClickSaveMoney = (goalId: string) => {
    clickedGoalId.current = goalId;

    mode === Mode.DEFAULT && setMode(Mode.SAVE_MONEY);
    mode === Mode.SAVE_MONEY && setMode(Mode.DEFAULT);
  };

  const onClickDelete = (goalId: string) => {
    clickedGoalId.current = goalId;

    setDeleteModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onConfirmDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, isVisible: false }));

    await goalsService.deleteGoalById(clickedGoalId.current!);
    setToastMessage({
      isVisible: true,
      title: "Success",
      message: "삭제되었습니다",
    });
  };

  return (
    <>
      <li className={styles.goal}>
        <section className={styles.goalHeader}>
          <div className={styles.titleContainer}>
            <Link className={styles.goalTitle} to={`/goals/${id}`}>
              {formattedGoalTitle}
            </Link>
            <p className={styles.goalDate}>{formattedGoalDate}</p>
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
          <p className={styles.tag}>{`D-${leftDays}일`}</p>
          <p className={styles.tag}>{formattedMoney}</p>
          <p className={styles.tag}>{`${formattedAchieveRate}% 달성`}</p>
        </section>
      </li>
      <Modal
        modal={deleteModal}
        onClickBackground={onClickBackground}
        onCancelClick={onClickCancel}
        onConfirmClick={onConfirmDelete}
      />
    </>
  );
}

export default GoalListItem;
