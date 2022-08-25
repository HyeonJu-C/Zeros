import { isAfter } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ModalState } from "../../../components/Modal/Modal";
import { ToastMessageState } from "../../../components/ToastMessage/ToastMessage";
import { GoalData } from "../../../services/firebase/goals-database";
import { parseGoalDate } from "../../../utils/format-goal-data";
import styles from "./CardControllers.module.css";

interface Props {
  data: GoalData;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageState>>;
}

function CardControllers({ data, setModal, setToastMessage }: Props) {
  const navigate = useNavigate();
  const { id, goalDate } = data;

  const now = new Date();
  const parsedGoalDate = parseGoalDate(goalDate as string);
  const isOutdated = isAfter(now, parsedGoalDate);

  const onClickDelete = () => {
    setModal({
      isVisible: true,
      title: "Delete",
      message: "이 저축 목표를 삭제하시겠습니까?",
    });
  };

  const onClickSave: React.MouseEventHandler = () => {
    if (!isOutdated) {
      navigate(`${id}`, {
        state: {
          ...data,
        },
      });
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
        저축하기
      </button>
      <button type="button" onClick={onClickDelete} className={styles.delete}>
        삭제하기
      </button>
    </section>
  );
}

export default CardControllers;
