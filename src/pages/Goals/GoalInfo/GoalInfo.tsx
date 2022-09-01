import React from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { HiPencilAlt as PencilIcon } from "react-icons/hi";
import { auth } from "../../../services/firebase/config";
import {
  GoalData,
  SavedMoney,
} from "../../../services/firebase/goals-database";
import {
  formatGoalMoney,
  formatGoalDate,
  formatGoalTitle,
  parseGoalDate,
} from "../../../utils/format-goal-data";
import { Mode, PatchedGoalData } from "../GoalCard/GoalCard";
import PatchGoalForm from "../PatchGoalForm/PatchGoalForm";
import styles from "./GoalInfo.module.css";

interface Props {
  data: GoalData;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  patchedData: PatchedGoalData;
  setPatchedData: React.Dispatch<React.SetStateAction<PatchedGoalData>>;
}

function GoalInfo({ data, mode, setMode, patchedData, setPatchedData }: Props) {
  const { id, userId, goalDate, goalMoney, goalTitle, currentMoney } = data;

  const isAuthorized = auth.currentUser?.uid === userId;
  const parsedGoalDate = parseGoalDate(goalDate as string);
  const formattedGoalTitle = formatGoalTitle(goalTitle as string);

  const formattedGoalDate = patchedData?.goalDate
    ? formatGoalDate(parseGoalDate(patchedData?.goalDate))
    : formatGoalDate(parsedGoalDate);

  const formattedGoalMoney = patchedData?.goalMoney
    ? formatGoalMoney(patchedData?.goalMoney)
    : formatGoalMoney(goalMoney as string);

  const onClickEdit: React.MouseEventHandler = () => {
    setMode(Mode.EDIT);
  };

  return (
    <section className={styles.goalContainer}>
      <div className={styles.iconContainer}>
        <MoneyIcon color="#64c2a8" size="85%" />
      </div>
      <div className={styles.goal}>
        <h2>{formattedGoalTitle}</h2>
        {mode === Mode.EDIT && (
          <PatchGoalForm
            targetGoalId={id as string}
            setMode={setMode}
            setPatchedData={setPatchedData}
            originalInputs={{
              goalMoney: formattedGoalMoney as string,
              goalDate: formattedGoalDate as string,
              currentMoney: currentMoney as SavedMoney[],
            }}
          />
        )}
        {!(mode === Mode.EDIT) && (
          <>
            <p>{`목표금액은 ${formattedGoalMoney} 입니다.`}</p>
            <p>{`목표 기한은 ${formattedGoalDate} 입니다.`}</p>
          </>
        )}
      </div>
      {isAuthorized && !(mode === Mode.EDIT) && (
        <button type="button" className={styles.patch} onClick={onClickEdit}>
          <span className="sr-only">수정하기</span>
          <PencilIcon size={20} className={styles.icon} />
        </button>
      )}
    </section>
  );
}

export default GoalInfo;
