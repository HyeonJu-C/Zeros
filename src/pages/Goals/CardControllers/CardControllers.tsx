import { isAfter } from "date-fns";
import React, { useState } from "react";
import Modal, { ModalState } from "../../../components/Modal/Modal";
import ToastMessage, {
  ToastMessageState,
} from "../../../components/ToastMessage/ToastMessage";
import {
  deleteGoal,
  GoalData,
} from "../../../services/firebase/goals-database";
import { parseGoalDate } from "../../../utils/format-goal-data";
import { Mode, PatchedGoalData } from "../GoalCard/GoalCard";
import styles from "./CardControllers.module.css";

interface Props {
  data: GoalData;
  patchedData: PatchedGoalData | null;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function CardControllers({
  data,
  patchedData,
  mode,
  setMode,
  setIsDeleted,
}: Props) {
  const { goalDate, id } = data;
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });

  const now = new Date();
  const parsedGoalDate =
    parseGoalDate(patchedData?.goalDate as string) ||
    parseGoalDate(goalDate as string);

  const isOutdated = isAfter(now, parsedGoalDate);

  const onClickSave: React.MouseEventHandler = (event) => {
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

  const onClickDelete: React.MouseEventHandler = (event) => {
    setModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onConfirmDelete = async () => {
    setModal({ isVisible: false });
    await deleteGoal(id as string);

    setToastMessage({
      isVisible: true,
      title: "Delete",
      message: "삭제되었습니다.",
    });
  };

  const onCancelDelete = () => {
    setModal({ isVisible: false });
  };

  return (
    <>
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
      {modal.isVisible && (
        <Modal
          title={modal.title}
          message={modal.message}
          setModal={setModal}
          onCancelClick={onCancelDelete}
          onConfirmClick={onConfirmDelete}
        />
      )}
      {toastMessage.isVisible && (
        <ToastMessage
          title={toastMessage.title as string}
          message={toastMessage.message as string}
          isMessageVisible={toastMessage.isVisible}
          setToastMessage={setToastMessage}
          onDisappearMessage={() => setIsDeleted(true)}
        />
      )}
    </>
  );
}

export default CardControllers;
