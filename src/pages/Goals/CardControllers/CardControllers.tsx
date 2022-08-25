import { isAfter } from "date-fns";
import React from "react";
import { ModalState } from "../../../components/Modal/Modal";
import { ToastMessageState } from "../../../components/ToastMessage/ToastMessage";
import { GoalData } from "../../../services/firebase/goals-database";
import { parseGoalDate } from "../../../utils/format-goal-data";
import { Mode, PatchedGoalData } from "../GoalCard/GoalCard";
import styles from "./CardControllers.module.css";

interface Props {
  data: GoalData;
  patchedData: PatchedGoalData | null;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageState>>;
}

function CardControllers({
  data,
  patchedData,
  mode,
  setMode,
  setModal,
  setToastMessage,
}: Props) {
  const { id, goalDate } = data;

  const now = new Date();
  const parsedGoalDate =
    parseGoalDate(patchedData?.goalDate as string) ||
    parseGoalDate(goalDate as string);

  const isOutdated = isAfter(now, parsedGoalDate);

  const onClickDelete: React.MouseEventHandler = (event) => {
    event.stopPropagation();

    setModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onClickSave: React.MouseEventHandler = (event) => {
    event.stopPropagation();

    if (!isOutdated) {
      mode !== Mode.SAVE && setMode(Mode.SAVE);
      mode === Mode.SAVE && setMode(Mode.DEFAULT);
      return;
    }

    setToastMessage({
      isVisible: true,
      title: "Fail",
      message:
        "목표 기한이 지나 저축할 수 없습니다. 새로운 목표를 만들거나, 기한을 조정해 주세요.",
    });
  };

  return (
    <section className={styles.buttonContainer}>
      <button
        type="button"
        onClick={onClickSave}
        className={`${styles.save} ${isOutdated ? styles.outdated : ""}`}
      >
        {mode === Mode.SAVE ? "취소하기" : "저축하기"}
      </button>
      <button type="button" onClick={onClickDelete} className={styles.delete}>
        삭제하기
      </button>
    </section>
  );
}

export default CardControllers;
