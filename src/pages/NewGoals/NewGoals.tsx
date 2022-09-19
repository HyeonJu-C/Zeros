import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import useModal from "../../hooks/useModal";
import useToastMessage from "../../hooks/useToastMessage";
import GoalsService from "../../services/firebase/goals-database";
import { GoalData } from "../../types/goals";
import GoalPresenter from "../../presenter/goal-presenter";
import GoalForm from "./GoalForm/GoalForm";

interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}

function NewGoals({ goalsService, goalsPresenter }: Props) {
  const inputValues = useRef<GoalData | null>(null);
  const {
    modal: postModal,
    setModal: setPostModal,
    onClickBackground,
    onClickCancel,
  } = useModal();
  const { toastMessage, setToastMessage } = useToastMessage();
  const navigate = useNavigate();

  const navigateToGoalsPage = () => {
    navigate("/goals");
  };

  const onSubmit = (userInputs: GoalData) => {
    inputValues.current = userInputs;

    setPostModal({
      isVisible: true,
      title: "Post",
      message: "제출하시겠습니까?",
    });
  };

  const onConfirmSubmit = async () => {
    setPostModal((prev) => ({ ...prev, isVisible: false }));

    await goalsService.postGoal(inputValues.current as GoalData);
    setToastMessage({
      isVisible: true,
      title: "Success",
      message: "제출되었습니다.",
    });
  };

  const onSubmitError = () => {
    setToastMessage({
      isVisible: true,
      title: "Fail",
      message: "양식이 유효하지 않습니다.",
    });
  };

  return (
    <>
      <section className="page-layout">
        <GoalForm
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          goalsPresenter={goalsPresenter}
        />
      </section>
      <Modal
        modal={postModal}
        onClickBackground={onClickBackground}
        onCancelClick={onClickCancel}
        onConfirmClick={onConfirmSubmit}
      />
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        visibleDuration={1000}
        onDisappearMessage={
          toastMessage.title === "Success" ? navigateToGoalsPage : null
        }
      />
    </>
  );
}

export default NewGoals;
