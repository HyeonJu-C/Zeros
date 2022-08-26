/* eslint-disable jsx-a11y/click-events-have-key-events */
import { parse } from "date-fns";
import React from "react";
import Input from "../../../components/Input/Input";
import SelectBox from "../../../components/SelectBox/SelectBox";
import useInput from "../../../hooks/useInput";
import useSelectBox from "../../../hooks/useSelectBox";
import { auth } from "../../../services/firebase/config";
import { GoalData } from "../../../services/firebase/goals-database";
import { formatGoalDate } from "../../../utils/format-goal-data";
import calculateGoalDate from "../../../utils/calculate-goal-date";
import { GOAL_DATE_OPTIONS } from "../../../utils/constants";
import { validateGoalSaving, validateUserName } from "../utils/validate";
import styles from "./GoalForm.module.css";

interface Props {
  onSubmit: (value: GoalData) => void;
  onSubmitError: () => void;
}

function GoalForm({ onSubmitError, onSubmit }: Props) {
  const [userName, onChangeUserName, onBlurUserName, isUserNameError] =
    useInput(validateUserName);

  const [goalMoney, onChangeGoalMoney, onBlurGoalMoney, isGoalMoneyError] =
    useInput(validateGoalSaving);

  const [goalTitle, onChangeGoalTitle, onBlurGoalTitle, isGoalTitleError] =
    useInput();

  const [
    isSelectBoxClicked,
    selectedGoalDate,
    onSelectGoalDate,
    isGoalDateError,
    toggleSelectBox,
  ] = useSelectBox((optionDate) =>
    formatGoalDate(calculateGoalDate(optionDate as string) as Date)
  );

  const isFormValid =
    userName &&
    goalMoney &&
    goalTitle &&
    selectedGoalDate &&
    !isUserNameError &&
    !isGoalMoneyError &&
    !isGoalTitleError &&
    !isGoalDateError;

  const onSubmitGoal: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    isFormValid &&
      onSubmit({
        currentMoney: [
          {
            date: JSON.stringify(new Date()),
            money: 0,
          },
        ],
        userName: userName as string,
        goalMoney: goalMoney as string,
        goalTitle: goalTitle as string,
        goalDate: JSON.stringify(
          parse(selectedGoalDate as string, "yyyy년 MM월 dd일", new Date())
        ),
        userId: auth.currentUser?.uid,
      });
    !isFormValid && onSubmitError();
  };

  return (
    <form onSubmit={onSubmitGoal} className={styles.form}>
      <Input
        id="user-name"
        type="text"
        isError={isUserNameError as boolean}
        placeholder="이름 또는 별명을 입력해 주세요(2글자 이상 10글자 이하)."
        minLength={2}
        maxLength={10}
        onChange={onChangeUserName as React.ChangeEventHandler}
        onBlur={onBlurUserName as React.FocusEventHandler<HTMLInputElement>}
        value={(userName as string) || ""}
      />
      {isUserNameError && (
        <p className={styles.feedback}>
          사용자 이름은 2글자 이상 10글자 이하로 입력해 주세요.
        </p>
      )}
      <Input
        id="goal-money"
        type="number"
        isError={isGoalMoneyError as boolean}
        min={100000}
        max={999999999999}
        placeholder="목표 금액을 입력해 주세요(10만원 이상)."
        onChange={onChangeGoalMoney as React.ChangeEventHandler}
        onBlur={onBlurGoalMoney as React.FocusEventHandler<HTMLInputElement>}
        value={goalMoney as number | ""}
      />
      {isGoalMoneyError && (
        <p className={styles.feedback}>
          목표금액은 10 만원 이상, 99,999,999 만원 이하로 입력해 주세요.
        </p>
      )}
      <Input
        id="goal-title"
        type="text"
        isError={isGoalTitleError as boolean}
        placeholder="저축 용도를 입력해 주세요."
        minLength={1}
        onChange={onChangeGoalTitle as React.ChangeEventHandler}
        onBlur={onBlurGoalTitle as React.FocusEventHandler<HTMLInputElement>}
        value={(goalTitle as string) || ""}
      />
      {isGoalTitleError && (
        <p className={styles.feedback}>저축 용도를 입력해 주세요.</p>
      )}
      <SelectBox
        id="goal-date"
        type="text"
        placeholder="목표 기한을 선택해 주세요"
        options={GOAL_DATE_OPTIONS}
        isError={isGoalDateError as boolean}
        isSelectBoxClicked={isSelectBoxClicked as boolean}
        onClick={toggleSelectBox as React.MouseEventHandler}
        onClickOption={
          onSelectGoalDate as React.MouseEventHandler<HTMLLIElement>
        }
        selectedOption={selectedGoalDate as string}
      />
      {isGoalDateError && (
        <p className={styles.feedback}>목표 기한을 선택해 주세요.</p>
      )}
      <button type="submit" className={styles.button}>
        제출하기
      </button>
    </form>
  );
}

export default GoalForm;
