/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { ImCancelCircle as CancelIcon } from "react-icons/im";
import { BsCheckCircle as CheckIcon } from "react-icons/bs";
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
  const [goalMoney, onChangeGoalMoney, onBlurGoalMoney, isGoalMoneyError] =
    useInput(validateGoalSaving);

  const processDate = (optionDate: string | number) =>
    formatGoalDate(calculateGoalDate(optionDate as string) as Date);

  const [
    isSelectBoxClicked,
    selectedGoalDate,
    onSelectGoalDate,
    isGoalDateError,
    toggleSelectBox,
  ] = useSelectBox(processDate);

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
      goalMoney as string
    );

    patchGoal(targetGoalId, {
      goalMoney: goalMoney as string,
      goalDate: JSON.stringify(parsedSelectedDate),
    }) //
      .then(() => {
        setMode(Mode.DEFAULT);
        setPatchedData((prev) => ({
          ...prev,
          achieveRate,
          goalMoney: goalMoney as string,
          goalDate: JSON.stringify(parsedSelectedDate),
        }));
      });
  };

  const onClickCheck: React.MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  const onClickCancel: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    setMode(Mode.DEFAULT);
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          id="patch-goal-money"
          type="number"
          value={+(goalMoney as string) || ""}
          isError={isGoalMoneyError as boolean}
          min={100000}
          placeholder={`목표금액은 ${originalInputs.goalMoney} 입니다.`}
          onClick={(event) => event.stopPropagation()}
          onChange={onChangeGoalMoney as React.ChangeEventHandler}
          onBlur={onBlurGoalMoney as React.FocusEventHandler<HTMLInputElement>}
        />
        {isGoalMoneyError && (
          <p className={styles.feedback}>
            목표 금액은 10 만원 이상으로 입력해 주세요.
          </p>
        )}
        <SelectBox
          id="patch-target-date"
          type="text"
          options={GOAL_DATE_OPTIONS}
          isError={isGoalDateError as boolean}
          placeholder={`목표기한은 ${originalInputs.goalDate} 입니다.`}
          isSelectBoxClicked={isSelectBoxClicked as boolean}
          selectedOption={selectedGoalDate as string}
          onClick={(event) => {
            event.stopPropagation();
            (toggleSelectBox as React.MouseEventHandler)(event);
          }}
          onClickOption={(event) => {
            event.stopPropagation();
            (onSelectGoalDate as React.MouseEventHandler)(event);
          }}
          scrollWithHeight="70px"
        />
        {isGoalDateError && (
          <p className={styles.feedback}>목표 기한을 선택해 주세요.</p>
        )}
        <button
          type="submit"
          className={`${styles.button} ${styles.submit}`}
          onClick={onClickCheck}
        >
          <span className="sr-only">수정</span>
          <CheckIcon size={20} color="#42dc99" />
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.cancel}`}
          onClick={onClickCancel}
        >
          <span className="sr-only">취소</span>
          <CancelIcon size={20} color="#f5554a" />
        </button>
      </form>
      {toastMessage.isVisible && (
        <ToastMessage
          title={toastMessage.title as string}
          message={toastMessage.message as string}
          isMessageVisible={toastMessage.isVisible}
          setToastMessage={setToastMessage}
          visibleDuration={1000}
        />
      )}
    </>
  );
}

export default PatchGoalForm;
