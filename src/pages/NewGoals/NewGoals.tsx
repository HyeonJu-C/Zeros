import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal, { ModalState } from "../../components/Modal/Modal";
import ToastMessage, {
  ToastMessageState,
} from "../../components/ToastMessage/ToastMessage";
import { GoalData, postGoal } from "../../services/firebase/goals-database";
import GoalForm from "./GoalForm/GoalForm";
import styles from "./NewGoals.module.css";

function NewGoals() {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });
  const {
    isVisible: isModalVisible,
    title: modalTitle,
    message: modalMessage,
  } = modal;

  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });
  const {
    isVisible: isToastMessageVisible,
    title: toastMessageTitle,
    message: toastMessageContents,
  } = toastMessage;

  const inputValues = useRef<GoalData | null>(null);

  const navigate = useNavigate();

  const onSubmit = (userInputs: GoalData) => {
    inputValues.current = userInputs;

    setModal({
      isVisible: true,
      title: "Post",
      message: "제출하시겠습니까?",
    });
  };

  const onSubmitError = () => {
    setModal({
      isVisible: true,
      title: "Fail",
      message: "양식이 유효하지 않습니다.",
    });
  };

  const onCancelSubmit = () => {
    setModal({ isVisible: false });
  };

  const onConfirmSubmit = async () => {
    setModal({ isVisible: false });

    switch (modalTitle) {
      case "Fail":
        break;

      case "Post":
        await postGoal(inputValues.current as GoalData);
        setToastMessage({
          isVisible: true,
          title: "Success",
          message: "제출되었습니다.",
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <section className={styles.newGoals}>
        <GoalForm onSubmit={onSubmit} onSubmitError={onSubmitError} />
      </section>
      {isModalVisible && (
        <Modal
          title={modalTitle}
          message={modalMessage}
          setModal={setModal}
          onCancelClick={onCancelSubmit}
          onConfirmClick={onConfirmSubmit}
        />
      )}
      {isToastMessageVisible && (
        <ToastMessage
          title={toastMessageTitle as string}
          message={toastMessageContents as string}
          isMessageVisible={isToastMessageVisible}
          setToastMessage={setToastMessage}
          visibleDuration={1000}
          onDisappearMessage={() => navigate("/goals")}
        />
      )}
    </>
  );
}

export default NewGoals;
