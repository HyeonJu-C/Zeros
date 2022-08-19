import React, { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { auth } from "../../services/firebase/config";
import { GoalData, postGoal } from "../../services/firebase/database";
import GoalForm from "./GoalForm/GoalForm";
import styles from "./NewGoals.module.css";
import checkFormValid from "./utils/validate";

function NewGoals() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [inputValues, setInputValues] = useState<GoalData>({
    uid: auth.currentUser?.uid as string,
  });
  const navigate = useNavigate();

  const { isFormValid, feedback } = checkFormValid(inputValues);
  const concatedFeedback = feedback.join("\n");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setModalVisible(true);
  };

  const onCancelSubmit = () => {
    setModalVisible(false);
  };

  const onConfirmSubmit = async () => {
    setModalVisible(false);
    if (!auth.currentUser) return;
    if (!isFormValid) return;
    await postGoal(inputValues);
    setMessageVisible(true);
  };

  return (
    <>
      {isModalVisible && (
        <Modal
          title={isFormValid ? "Post" : "Fail To Post"}
          message={isFormValid ? "제출하시겠습니까?" : concatedFeedback}
          setModalVisible={setModalVisible}
          onCancelClick={onCancelSubmit}
          onConfirmClick={onConfirmSubmit}
        />
      )}
      {isMessageVisible && (
        <ToastMessage
          title="Success"
          message="제출되었습니다."
          isMessageVisible={isMessageVisible}
          setMessageVisible={setMessageVisible}
          visibleDuration={1000}
          callback={() => navigate("/goals")}
        />
      )}
      <section className={styles.newGoals}>
        <GoalForm
          onSubmit={onSubmit}
          setInputValues={setInputValues}
          inputValues={inputValues}
        />
      </section>
    </>
  );
}

export default NewGoals;
