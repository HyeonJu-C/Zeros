import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import useModal from "../../hooks/useModal";
import useToastMessage from "../../hooks/useToastMessage";
import GoalsService from "../../services/firebase/goals-database";
import { GoalData } from "../../types/goals";
import GoalPresenter from "../../utils/goal-presenter";
import GoalForm from "./GoalForm/GoalForm";

interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}

function NewGoals({ goalsService, goalsPresenter }: Props) {
  const { modal, setModal, onClickBackground, onClickCancel } = useModal();
  const { toastMessage, setToastMessage } = useToastMessage();

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

  const onConfirmSubmit = async () => {
    setModal({ isVisible: false });

    switch (modal.title) {
      case "Fail":
        break;

      case "Post":
        await goalsService.postGoal(inputValues.current as GoalData);
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
      <section className="page-layout">
        <GoalForm
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          goalsPresenter={goalsPresenter}
        />
      </section>
      <Modal
        modal={modal}
        onClickBackground={onClickBackground}
        onCancelClick={onClickCancel}
        onConfirmClick={onConfirmSubmit}
      />
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        visibleDuration={1000}
        onDisappearMessage={() => navigate("/goals")}
      />
    </>
  );
}

export default NewGoals;
