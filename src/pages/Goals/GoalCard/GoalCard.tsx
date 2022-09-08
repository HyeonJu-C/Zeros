/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import { TbConfetti as ConfettiIcon } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styles from "./GoalCard.module.css";

import {
  calculateAcheiveRate,
  formatAcheiveRate,
} from "../../../utils/format-goal-data";
import GoalInfo from "../GoalInfo/GoalInfo";
import AchieveRate from "../AchieveRate/AchieveRate";
import { GoalData, SavedMoney } from "../../../types/goals";

interface Props {
  data: GoalData;
}

export interface PatchedGoalData {
  goalDate?: string;
  goalMoney?: number;
  achieveRate?: number;
  currentMoney?: SavedMoney[];
}

export enum Mode {
  DEFAULT = "DEFAULT",
  EDIT = "EDIT",
  SAVE = "SAVE",
}

function GoalCard({ data }: Props) {
  const [patchedData, setPatchedData] = useState<PatchedGoalData>({});
  const authorElement = useRef<HTMLHeadingElement | null>(null);
  const navigate = useNavigate();

  const { id, userName, goalMoney, currentMoney } = data;

  const formattedAcheiveRate = patchedData.achieveRate
    ? formatAcheiveRate(patchedData?.achieveRate as number)
    : formatAcheiveRate(
        calculateAcheiveRate(currentMoney as SavedMoney[], goalMoney as number)
      );
  const isGoalAcheived = formattedAcheiveRate >= 100;

  const onClickCard: React.MouseEventHandler = () => {
    navigate(`${id}`, {
      state: { ...data, formattedAcheiveRate, patchedData },
    });
  };

  return (
    <article className={`${styles.card} `} onClick={onClickCard}>
      <h1 className={styles.author} ref={authorElement}>
        {`${userName} 님의 저축 목표 `}
        {isGoalAcheived && <ConfettiIcon size={25} color="#e1b530" />}
      </h1>
      <GoalInfo
        data={data}
        patchedData={patchedData}
        setPatchedData={setPatchedData}
      />
      <AchieveRate data={data} patchedData={patchedData} />
    </article>
  );
}

export default GoalCard;
