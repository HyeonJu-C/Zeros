/* eslint-disable jsx-a11y/click-events-have-key-events */
import { parse } from "date-fns";
import React from "react";
import Input from "../../../components/Input/Input";
import SelectBox from "../../../components/SelectBox/SelectBox";
import useInput from "../../../hooks/useInput";
import useSelectBox from "../../../hooks/useSelectBox";
import { auth } from "../../../services/firebase/config";
import GoalPresenter from "../../../presenter/goal-presenter";
import calculateGoalDate from "../../../presenter/calculate-goal-date";
import { GOAL_DATE_OPTIONS } from "../../../constants/constants";
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
  } = useInput({ type: "length", minLength: 2, maxLength: 10 });

  const {
    value: goalMoney,
    onChangeValue: onChangeGoalMoney,
    onBlur: onBlurGoalMoney,
    isError: isGoalMoneyError,
  } = useInput({ type: "size", min: 100000, max: 999999999999 });

  const {
    value: goalTitle,
    onChangeValue: onChangeGoalTitle,
    onBlur: onBlurGoalTitle,
    isError: isGoalTitleError,
  } = useInput({ type: "length", minLength: 1, maxLength: 20 });

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
          parse(selectedGoalDate as string, "yyyy??? MM??? dd???", new Date())
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
        placeholder="?????? ?????? ????????? ????????? ?????????(2?????? ?????? 10?????? ??????)."
        minLength={2}
        maxLength={10}
        onChange={onChangeUserName}
        onBlur={onBlurUserName}
        value={userName || ""}
      />
      {isUserNameError && (
        <p className={styles.feedback}>
          ????????? ????????? 2?????? ?????? 10?????? ????????? ????????? ?????????.
        </p>
      )}
      <Input
        id="goal-money"
        type="number"
        isError={isGoalMoneyError}
        min={100000}
        max={999999999999}
        placeholder="?????? ????????? ????????? ?????????(10?????? ??????)."
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
          ??????????????? 10 ?????? ??????, 99,999,999 ?????? ????????? ????????? ?????????.
        </p>
      )}
      <Input
        id="goal-title"
        type="text"
        isError={isGoalTitleError}
        placeholder="?????? ????????? ????????? ?????????(1?????? ?????? 20?????? ??????)."
        minLength={1}
        maxLength={20}
        onChange={onChangeGoalTitle}
        onBlur={onBlurGoalTitle}
        value={goalTitle || ""}
      />
      {isGoalTitleError && (
        <p className={styles.feedback}>
          ?????? ????????? 1?????? ?????? 20?????? ????????? ????????? ?????????.
        </p>
      )}
      <SelectBox
        id="goal-date"
        type="text"
        placeholder="?????? ????????? ????????? ?????????"
        options={GOAL_DATE_OPTIONS}
        isError={isGoalDateError}
        isSelectBoxClicked={isSelectBoxClicked}
        onClick={toggleSelectBox}
        onClickOption={onSelectGoalDate}
        selectedOption={selectedGoalDate || ""}
      />
      {isGoalDateError && (
        <p className={styles.feedback}>?????? ????????? ????????? ?????????.</p>
      )}
      <button type="submit" className={styles.button}>
        ????????????
      </button>
    </form>
  );
}

export default GoalForm;
