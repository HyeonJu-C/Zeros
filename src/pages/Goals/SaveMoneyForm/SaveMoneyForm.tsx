import React from "react";
import { RiHandCoinLine as CoinIcon } from "react-icons/ri";
import Input from "../../../components/Input/Input";
import useInput from "../../../hooks/useInput";
import {
  addSavedMoney,
  GoalData,
  SavedMoney,
} from "../../../services/firebase/goals-database";
import { calculateAcheiveRate } from "../../../utils/format-goal-data";
import { Mode, PatchedGoalData } from "../GoalCard/GoalCard";
import styles from "./SaveMoneyForm.module.css";

interface Props {
  data: GoalData;
  patchedData: PatchedGoalData | null;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setPatchedData: React.Dispatch<React.SetStateAction<PatchedGoalData>>;
}

function SaveMoneyForm({ data, patchedData, setPatchedData, setMode }: Props) {
  const [moneyValue, onChangeMoney, onBlur, isMoneyError] = useInput(
    (value: string) => +value > 0
  );

  const { id: goalId, goalMoney, currentMoney } = data;

  const isFormValid = moneyValue && !isMoneyError;

  const onSubmit: React.FormEventHandler = (evnet) => {
    evnet.preventDefault();

    if (!isFormValid) return;

    addSavedMoney(goalId as string, {
      date: JSON.stringify(new Date()),
      money: +moneyValue,
    }) //
      .then(() => {
        setPatchedData((prev) => {
          const patchedCurrentMoney = prev.currentMoney
            ? [
                ...prev.currentMoney,
                { date: JSON.stringify(new Date()), money: +moneyValue },
              ]
            : [
                ...(currentMoney as SavedMoney[]),
                { date: JSON.stringify(new Date()), money: +moneyValue },
              ];

          return {
            ...prev,
            currentMoney: patchedCurrentMoney,
            achieveRate: calculateAcheiveRate(
              patchedCurrentMoney,
              prev.goalMoney || (goalMoney as string)
            ),
          };
        });
        setMode(Mode.DEFAULT);
      });
  };

  return (
    <section className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          id="save-money"
          type="number"
          isError={isMoneyError as boolean}
          onChange={onChangeMoney as React.ChangeEventHandler}
          onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
          value={(moneyValue as string) || ""}
          placeholder="저축할 금액을 입력해 주세요."
          min={1}
          style={{ width: "90%", margin: 0 }}
        />
        <button type="submit" className={styles.button}>
          <span className="sr-only">제출</span>
          <CoinIcon size={20} className={styles.icon} />
        </button>
      </form>
      {isMoneyError && (
        <p className={styles.feedback}>저축 금액을 0원 이상 입력해 주세요.</p>
      )}
    </section>
  );
}

export default SaveMoneyForm;
