import { format, parseJSON } from "date-fns";
import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useRef,
} from "react";
import SelectBox from "../../../components/SelectBox/SelectBox";
import { GoalData } from "../../../services/firebase/database";
import calculateTargetDate from "../utils/calculate-target-date";
import styles from "./GoalForm.module.css";

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  setInputValues: Dispatch<SetStateAction<GoalData>>;
  inputValues: null | GoalData;
}

function GoalForm({ onSubmit, setInputValues, inputValues }: Props) {
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const userGoalInputRef = useRef<HTMLInputElement>(null);

  const onSelectTargetDate = (selectedDate: string | number) => {
    const calculatedTargetDate = calculateTargetDate(selectedDate as string);

    setInputValues((prev) => ({
      ...prev,
      targetDate: JSON.stringify(calculatedTargetDate),
    }));
  };

  const onSubmitGoal: FormEventHandler<HTMLFormElement> = (event) => {
    onSubmit(event);
    setInputValues((prev) => ({
      ...prev,
      currentSavings: 0,
      userName: userNameInputRef.current?.value as string,
      goalSavings: userGoalInputRef.current?.value as string,
    }));
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
          ref={userNameInputRef}
        />
      </label>
      <label htmlFor="savings-goal">
        <input
          type="text"
          name="savings-goal"
          id="savings-goal"
          min={100000}
          placeholder="목표 금액을 입력해 주세요(10만원 이상)."
          className={styles.input}
          ref={userGoalInputRef}
        />
      </label>
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
        selectedOption={
          inputValues?.targetDate
            ? format(parseJSON(inputValues.targetDate), "yyyy년 MM월 dd일")
            : null
        }
        onSelectOption={onSelectTargetDate}
      />
      <button type="submit" className={styles.button}>
        제출하기
      </button>
    </form>
  );
}

export default GoalForm;
