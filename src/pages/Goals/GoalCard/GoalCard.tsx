/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import Modal, { ModalState } from "../../../components/Modal/Modal";
import { auth } from "../../../services/firebase/config";
import {
  deleteGoal,
  GoalData,
  SavedMoney,
} from "../../../services/firebase/goals-database";
import styles from "./GoalCard.module.css";
import ToastMessage, {
  ToastMessageState,
} from "../../../components/ToastMessage/ToastMessage";
import {
  calculateAcheiveRate,
  formatAcheiveRate,
} from "../../../utils/format-goal-data";
import GoalInfo from "../GoalInfo/GoalInfo";
import AchieveRate from "../AchieveRate/AchieveRate";
import CardControllers from "../CardControllers/CardControllers";

interface Props {
  data: GoalData;
}

export interface PatchedGoalData {
  goalDate: string;
  goalMoney: string;
  achieveRate: number;
}

export enum Mode {
  DEFAULT = "DEFAULT",
  EDIT = "EDIT",
  SAVE = "SAVE",
}

function GoalCard({ data }: Props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [patchedData, setPatchedData] = useState<null | PatchedGoalData>(null);
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });

  const { id, userName, userId, goalMoney, currentMoney } = data;

  const isAuthorized = auth.currentUser?.uid === userId;

  const formattedAcheiveRate =
    patchedData?.achieveRate ||
    formatAcheiveRate(
      calculateAcheiveRate(currentMoney as SavedMoney[], goalMoney as string)
    );

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

  return (
    <>
      {!isDeleted && (
        <article className={`${styles.card} `}>
          <h1 className={styles.author}>
            {`${userName} 님의 저축 목표 `}
            {formattedAcheiveRate >= 100 && <ConfettiIcon size={25} />}
          </h1>
          <GoalInfo
            data={data}
            mode={mode}
            setMode={setMode}
            patchedData={patchedData}
            setPatchedData={setPatchedData}
          />
          <AchieveRate data={data} patchedData={patchedData} />
          {isAuthorized && (
            <CardControllers
              data={data}
              setModal={setModal}
              setToastMessage={setToastMessage}
            />
          )}
        </article>
      )}
      {modal.isVisible && (
        <Modal
          title={modal.title}
          message={modal.message}
          setModal={setModal}
          onCancelClick={onCancelDelete}
          onConfirmClick={onConfirmDelete}
        />
      )}
      {toastMessage.isVisible && (
        <ToastMessage
          title={toastMessage.title as string}
          message={toastMessage.message as string}
          isMessageVisible={toastMessage.isVisible}
          setToastMessage={setToastMessage}
        />
      )}
    </>
  );
}

export default GoalCard;
