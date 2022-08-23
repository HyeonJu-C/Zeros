/* eslint-disable jsx-a11y/click-events-have-key-events */
import { format, parse } from "date-fns";
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import SelectBox from "../../../components/SelectBox/SelectBox";
import useInput from "../../../hooks/useInput";
import useSelectBox from "../../../hooks/useSelectBox";
import { auth } from "../../../services/firebase/config";
import { GoalData } from "../../../services/firebase/database";
import calculateTargetDate from "../utils/calculate-target-date";
import { validateGoalSaving, validateUserName } from "../utils/validate";
import styles from "./GoalForm.module.css";

interface Props {
  onSubmit: (value: GoalData) => void;
  onSubmitError: () => void;
}

function GoalForm({ onSubmitError, onSubmit }: Props) {
  const [userNameValue, onChangeUserName, onBlurUserName, isUserNameError] =
    useInput(validateUserName);

  const [
    goalSavingValue,
    onChangeGoalSaving,
    onBlurGoalSaving,
    isGoalSavingError,
  ] = useInput(validateGoalSaving);

  const [
    isSelectBoxClicked,
    selectedDate,
    onSelectDate,
    isTargetDateError,
    toggleSelectBox,
  ] = useSelectBox((optionDate) =>
    format(
      calculateTargetDate(optionDate as string) as Date,
      "yyyy년 MM월 dd일"
    )
  );

  const isFormValid =
    userNameValue &&
    goalSavingValue &&
    selectedDate &&
    !isUserNameError &&
    !isGoalSavingError;

  const onSubmitGoal: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    isFormValid &&
      onSubmit({
        currentSavings: 0,
        userName: userNameValue as string,
        goalSavings: goalSavingValue as string,
        targetDate: JSON.stringify(
          parse(selectedDate as string, "yyyy년 MM월 dd일", new Date())
        ),
        uid: auth.currentUser?.uid,
      });
    !isFormValid && onSubmitError();
  };

  return (
    <form onSubmit={onSubmitGoal} className={styles.form}>
      <label htmlFor="user-name">
        <input
          type="text"
          name="user-name"
          id="user-name"
          minLength={2}
          maxLength={10}
          placeholder="이름 또는 별명을 입력해 주세요(2글자 이상 10글자 이하)."
          className={styles.input}
          onChange={onChangeUserName as ChangeEventHandler}
          onBlur={onBlurUserName as FocusEventHandler<HTMLInputElement>}
        />
      </label>
      {isUserNameError && (
        <p className={styles.invalid}>
          사용자 이름은 2글자 이상 10글자 이하로 입력해 주세요.
        </p>
      )}
      <label htmlFor="savings-goal">
        <input
          type="text"
          name="savings-goal"
          id="savings-goal"
          min={100000}
          placeholder="목표 금액을 입력해 주세요(10만원 이상)."
          className={styles.input}
          onChange={onChangeGoalSaving as ChangeEventHandler}
          onBlur={onBlurGoalSaving as FocusEventHandler<HTMLInputElement>}
        />
      </label>
      {isGoalSavingError && (
        <p className={styles.invalid}>
          목표 금액은 10 만원 이상으로 입력해 주세요.
        </p>
      )}
      <SelectBox
        id="target-date"
        title="목표 기한을 선택해 주세요"
        options={[
          "1 개월",
          "2 개월",
          "3 개월",
          "4 개월",
          "5 개월",
          "6 개월",
          "1 년",
        ]}
        isSelectBoxClicked={isSelectBoxClicked as boolean}
        toggleSelectBox={toggleSelectBox as () => void}
        selectedOption={selectedDate as string}
        onSelectOption={onSelectDate as MouseEventHandler<HTMLLIElement>}
      />
      {isTargetDateError && (
        <p className={styles.invalid}>목표 기한을 선택해 주세요.</p>
      )}
      <button type="submit" className={styles.button}>
        제출하기
      </button>
    </form>
  );
}

export default GoalForm;
