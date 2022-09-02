/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import {
  AiOutlineCloseCircle as CancelIcon,
  AiOutlineCheckCircle as CheckIcon,
} from "react-icons/ai";
import { parse } from "date-fns";
import Input from "../../../components/Input/Input";
import SelectBox from "../../../components/SelectBox/SelectBox";
import ToastMessage, {
  ToastMessageState,
} from "../../../components/ToastMessage/ToastMessage";
import useInput from "../../../hooks/useInput";
import useSelectBox from "../../../hooks/useSelectBox";
import {
  patchGoal,
  SavedMoney,
} from "../../../services/firebase/goals-database";
import calculateGoalDate from "../../../utils/calculate-goal-date";
import { validateGoalSaving } from "../../NewGoals/utils/validate";
import { Mode, PatchedGoalData } from "../GoalCard/GoalCard";
import styles from "./PatchGoalForm.module.css";
import { GOAL_DATE_OPTIONS } from "../../../utils/constants";
import {
  calculateAcheiveRate,
  formatGoalDate,
  formatGoalMoney,
} from "../../../utils/format-goal-data";

interface Props {
  targetGoalId: string;
  originalInputs: {
    goalMoney: string;
    goalDate: string;
    currentMoney: SavedMoney[];
  };
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setPatchedData: React.Dispatch<React.SetStateAction<PatchedGoalData>>;
}

function PatchGoalForm({
  targetGoalId,
  originalInputs,
  setMode,
  setPatchedData,
}: Props) {
  const {
    value: goalMoney,
    onChangeValue: onChangeGoalMoney,
    onBlur: onBlurGoalMoney,
    isError: isGoalMoneyError,
  } = useInput(validateGoalSaving);

  const processDate = (optionDate: string | number) =>
    formatGoalDate(calculateGoalDate(optionDate as string) as Date);

  const {
    isSelectBoxClicked,
    selectedOption: selectedGoalDate,
    onSelectOption: onSelectGoalDate,
    isError: isGoalDateError,
    toggleSelectBox,
  } = useSelectBox(processDate);

  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });

  const isFormValid =
    goalMoney && selectedGoalDate && !isGoalMoneyError && !isGoalDateError;

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      setToastMessage({
        isVisible: true,
        title: "Fail",
        message: "양식이 유효하지 않습니다.",
      });
      return;
    }

    const parsedSelectedDate = parse(
      selectedGoalDate as string,
      "yyyy년 MM월 dd일",
      new Date()
    );
    const achieveRate = calculateAcheiveRate(
      originalInputs.currentMoney,
      goalMoney
    );

    patchGoal(targetGoalId, {
      goalMoney: goalMoney || "",
      goalDate: JSON.stringify(parsedSelectedDate),
    }) //
      .then(() => {
        setMode(Mode.DEFAULT);
        setPatchedData((prev) => ({
          ...prev,
          achieveRate,
          goalMoney: goalMoney || "",
          goalDate: JSON.stringify(parsedSelectedDate),
        }));
      });
  };

  const onClickCancel: React.MouseEventHandler = () => {
    setMode(Mode.DEFAULT);
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          id="patch-goal-money"
          type="number"
          value={+goalMoney || ""}
          isError={isGoalMoneyError}
          min={100000}
          max={999999999999}
          placeholder={`목표금액은 ${originalInputs.goalMoney} 입니다.`}
          onChange={onChangeGoalMoney}
          onBlur={onBlurGoalMoney}
        />
        {goalMoney && (
          <p className={`${styles.feedback} ${styles.money}`}>
            {formatGoalMoney(goalMoney.toString())}
          </p>
        )}
        {isGoalMoneyError && (
          <p className={styles.feedback}>
            목표금액은 10 만원 이상, 99,999,999 만원 이하로 입력해 주세요.
          </p>
        )}
        <SelectBox
          id="patch-target-date"
          type="text"
          options={GOAL_DATE_OPTIONS}
          isError={isGoalDateError}
          placeholder={`목표기한은 ${originalInputs.goalDate} 입니다.`}
          isSelectBoxClicked={isSelectBoxClicked}
          selectedOption={selectedGoalDate || ""}
          onClick={toggleSelectBox}
          onClickOption={onSelectGoalDate}
          scrollWithHeight="70px"
        />
        {isGoalDateError && (
          <p className={styles.feedback}>목표 기한을 선택해 주세요.</p>
        )}
        <button type="submit" className={`${styles.button} ${styles.submit}`}>
          <span className="sr-only">수정</span>
          <CheckIcon size={25} className={`${styles.icon} ${styles.edit}`} />
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.cancel}`}
          onClick={onClickCancel}
        >
          <span className="sr-only">취소</span>
          <CancelIcon size={25} className={`${styles.icon} ${styles.cancel}`} />
        </button>
      </form>
      <ToastMessage
        title={toastMessage.title || ""}
        message={toastMessage.message || ""}
        isMessageVisible={toastMessage.isVisible}
        setToastMessage={setToastMessage}
        visibleDuration={1000}
      />
    </>
  );
}

export default PatchGoalForm;
