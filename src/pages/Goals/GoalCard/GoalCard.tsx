/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
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
import SaveMoneyForm from "../SaveMoneyForm/SaveMoneyForm";

interface Props {
  data: GoalData;
}

export interface PatchedGoalData {
  goalDate?: string;
  goalMoney?: string;
  parsedGoalMoney?: number;
  achieveRate?: number;
  currentMoney?: SavedMoney[];
}

export enum Mode {
  DEFAULT = "DEFAULT",
  EDIT = "EDIT",
  SAVE = "SAVE",
}

function GoalCard({ data }: Props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });
  const [patchedData, setPatchedData] = useState<PatchedGoalData>({});

  const navigate = useNavigate();

  const { id, userName, userId, goalMoney, currentMoney } = data;

  const isAuthorized = auth.currentUser?.uid === userId;

  const formattedAcheiveRate = patchedData.achieveRate
    ? formatAcheiveRate(patchedData?.achieveRate as number)
    : formatAcheiveRate(
        calculateAcheiveRate(currentMoney as SavedMoney[], goalMoney as string)
      );
  const isGoalAcheived = formattedAcheiveRate >= 100;

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

  const onClickCard: React.MouseEventHandler = () => {
    navigate(`${id}`, {
      state: { ...data, formattedAcheiveRate, patchedData },
    });
  };

  return (
    <>
      {!isDeleted && (
        <article className={`${styles.card} `} onClick={onClickCard}>
          <h1 className={styles.author}>
            {`${userName} 님의 저축 목표 `}
            {isGoalAcheived && <ConfettiIcon size={25} color="#e1b530" />}
          </h1>
          <GoalInfo
            data={data}
            patchedData={patchedData}
            mode={mode}
            setMode={setMode}
            setPatchedData={setPatchedData}
          />
          <AchieveRate data={data} patchedData={patchedData} />
          {mode === Mode.SAVE && (
            <SaveMoneyForm
              data={data}
              patchedData={patchedData}
              setMode={setMode}
              setPatchedData={setPatchedData}
            />
          )}
          {isAuthorized && (
            <CardControllers
              data={data}
              patchedData={patchedData}
              mode={mode}
              setMode={setMode}
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
