/* eslint-disable jsx-a11y/click-events-have-key-events */
import { parse } from "date-fns";
import React from "react";
import Input from "../../../components/Input/Input";
import SelectBox from "../../../components/SelectBox/SelectBox";
import useInput from "../../../hooks/useInput";
import useSelectBox from "../../../hooks/useSelectBox";
import { auth } from "../../../services/firebase/config";
import GoalPresenter from "../../../utils/goal-presenter";
import calculateGoalDate from "../../../utils/calculate-goal-date";
import { GOAL_DATE_OPTIONS } from "../../../utils/constants";
import { validateGoalSaving, validateUserName } from "../utils/validate";
import styles from "./GoalForm.module.css";
import { GoalData } from "../../../types/goals";

interface Props {
  onSubmit: (value: GoalData) => void;
  onSubmitError: () => void;
  goalsPresenter: GoalPresenter;
}

function GoalForm({ onSubmitError, onSubmit, goalsPresenter }: Props) {
  const {
    value: userName,
    onChangeValue: onChangeUserName,
    onBlur: onBlurUserName,
    isError: isUserNameError,
  } = useInput(validateUserName);

  const {
    value: goalMoney,
    onChangeValue: onChangeGoalMoney,
    onBlur: onBlurGoalMoney,
    isError: isGoalMoneyError,
  } = useInput(validateGoalSaving);

  const {
    value: goalTitle,
    onChangeValue: onChangeGoalTitle,
    onBlur: onBlurGoalTitle,
    isError: isGoalTitleError,
  } = useInput();

  const {
    isSelectBoxClicked,
    selectedOption: selectedGoalDate,
    onSelectOption: onSelectGoalDate,
    isError: isGoalDateError,
    toggleSelectBox,
  } = useSelectBox((optionDate) =>
    goalsPresenter.formatGoalDate(
      JSON.stringify(calculateGoalDate(optionDate as string))
    )
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
        userName,
        goalMoney: +goalMoney,
        goalTitle,
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
        isError={isUserNameError}
        placeholder="이름 또는 별명을 입력해 주세요(2글자 이상 10글자 이하)."
        minLength={2}
        maxLength={10}
        onChange={onChangeUserName}
        onBlur={onBlurUserName}
        value={userName || ""}
      />
      {isUserNameError && (
        <p className={styles.feedback}>
          사용자 이름은 2글자 이상 10글자 이하로 입력해 주세요.
        </p>
      )}
      <Input
        id="goal-money"
        type="number"
        isError={isGoalMoneyError}
        min={100000}
        max={999999999999}
        placeholder="목표 금액을 입력해 주세요(10만원 이상)."
        onChange={onChangeGoalMoney}
        onBlur={onBlurGoalMoney}
        value={goalMoney || ""}
      />
      {goalMoney && (
        <p className={`${styles.feedback} ${styles.money}`}>
          {goalsPresenter.formatMoney(+goalMoney)}
        </p>
      )}
      {isGoalMoneyError && (
        <p className={styles.feedback}>
          목표금액은 10 만원 이상, 99,999,999 만원 이하로 입력해 주세요.
        </p>
      )}
      <Input
        id="goal-title"
        type="text"
        isError={isGoalTitleError}
        placeholder="저축 용도를 입력해 주세요."
        minLength={1}
        onChange={onChangeGoalTitle}
        onBlur={onBlurGoalTitle}
        value={goalTitle || ""}
      />
      {isGoalTitleError && (
        <p className={styles.feedback}>저축 용도를 입력해 주세요.</p>
      )}
      <SelectBox
        id="goal-date"
        type="text"
        placeholder="목표 기한을 선택해 주세요"
        options={GOAL_DATE_OPTIONS}
        isError={isGoalDateError}
        isSelectBoxClicked={isSelectBoxClicked}
        onClick={toggleSelectBox}
        onClickOption={onSelectGoalDate}
        selectedOption={selectedGoalDate || ""}
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
