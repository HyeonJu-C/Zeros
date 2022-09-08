import React from "react";
import { RiHandCoinLine as CoinIcon } from "react-icons/ri";
import Input from "../../../components/Input/Input";
import useInput from "../../../hooks/useInput";
import { addSavedMoney } from "../../../services/firebase/goals-database";
import { GoalData } from "../../../types/goals";
import { formatGoalMoney } from "../../../utils/format-goal-data";
import { Mode } from "../GoalCard/GoalCard";
import styles from "./SaveMoneyForm.module.css";

interface Props {
  data: GoalData;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

function SaveMoneyForm({ data, setMode }: Props) {
  const {
    value: moneyValue,
    onChangeValue: onChangeMoney,
    onBlur,
    isError: isMoneyError,
  } = useInput((value: string) => +value > 0);

  const { id: goalId } = data;

  const isFormValid = moneyValue && !isMoneyError;

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    addSavedMoney(goalId as string, {
      date: JSON.stringify(new Date()),
      money: +moneyValue,
    }) //
      .then(() => {
        setMode(Mode.DEFAULT);
      });
  };

  return (
    <section className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          id="save-money"
          type="number"
          isError={isMoneyError}
          onChange={onChangeMoney}
          onBlur={onBlur}
          value={+moneyValue || ""}
          placeholder="저축할 금액을 입력해 주세요."
          min={1}
          style={{ width: "90%", margin: 0 }}
        />
        <button type="submit" className={styles.button}>
          <span className="sr-only">제출</span>
          <CoinIcon size={20} className={styles.icon} />
        </button>
      </form>
      {moneyValue && (
        <p className={`${styles.feedback} ${styles.money}`}>
          {formatGoalMoney(+moneyValue)}
        </p>
      )}
      {isMoneyError && (
        <p className={styles.feedback}>저축 금액을 0원 이상 입력해 주세요.</p>
      )}
    </section>
  );
}

export default SaveMoneyForm;
