/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase/config";
import {
  GoalData,
  SavedMoney,
} from "../../../services/firebase/goals-database";
import styles from "./GoalCard.module.css";

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
  const [patchedData, setPatchedData] = useState<PatchedGoalData>({});
  const authorElement = useRef<HTMLHeadingElement | null>(null);

  const navigate = useNavigate();

  const { id, userName, userId, goalMoney, currentMoney } = data;

  const isAuthorized = auth.currentUser?.uid === userId;

  const formattedAcheiveRate = patchedData.achieveRate
    ? formatAcheiveRate(patchedData?.achieveRate as number)
    : formatAcheiveRate(
        calculateAcheiveRate(currentMoney as SavedMoney[], goalMoney as string)
      );
  const isGoalAcheived = formattedAcheiveRate >= 100;

  const onClickCard: React.MouseEventHandler = (event) => {
    const isCardClicked = event.target === event.currentTarget;
    const isAuthorClicked = event.target === authorElement.current;

    if (!isCardClicked && !isAuthorClicked) return;

    navigate(`${id}`, {
      state: { ...data, formattedAcheiveRate, patchedData },
    });
  };

  return isDeleted ? null : (
    <article className={`${styles.card} `} onClick={onClickCard}>
      <h1 className={styles.author} ref={authorElement}>
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
          setIsDeleted={setIsDeleted}
        />
      )}
    </article>
  );
}

export default GoalCard;
