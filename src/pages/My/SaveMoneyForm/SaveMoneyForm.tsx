/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import Input from "../../../components/Input/Input";
import useInput from "../../../hooks/useInput";
import { ToastMessageState } from "../../../hooks/useToastMessage";
import GoalsService from "../../../services/firebase/goals-database";
import GoalPresenter from "../../../utils/goal-presenter";
import { Mode } from "../My";
import styles from "./SaveMoneyForm.module.css";

interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
  clickedGoalId: null | string;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageState>>;
}

function SaveMoneyForm({
  goalsService,
  goalsPresenter,
  clickedGoalId,
  setMode,
  setToastMessage,
}: Props) {
  const { value, isError, onBlur, onChangeValue } = useInput({
    type: "size",
    min: 1,
    max: Infinity,
  });
  const formattedMoney = goalsPresenter.formatMoney(+value);

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    if (!value || isError) {
      setToastMessage({
        isVisible: true,
        title: "Fail",
        message: "저축할 금액을 입력해 주세요",
      });
      return;
    }

    const now = JSON.stringify(new Date());
    await goalsService //
      .saveMoneyById(
        {
          date: now,
          money: +value,
        },
        clickedGoalId!
      );
    setToastMessage({
      isVisible: true,
      title: "Success",
      message: "저축하였습니다",
    });
    setMode(Mode.DEFAULT);
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          id="save-money"
          type="number"
          value={value}
          onChange={onChangeValue}
          onBlur={onBlur}
          isError={isError}
          placeholder="저축할 금액을 입력해 주세요"
          style={{ width: "80%" }}
        />
        <button type="submit" className={styles.confirm}>
          확인
        </button>
      </form>
      {isError && <p className={styles.feedback}>저축 금액을 입력해 주세요.</p>}
      {!isError && value && (
        <p className={`${styles.feedback} ${styles.money}`}>{formattedMoney}</p>
      )}
    </>
  );
}

export default SaveMoneyForm;
