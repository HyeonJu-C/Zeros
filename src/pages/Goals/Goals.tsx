import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Modal from "../../components/Modal/Modal";
import AuthContext from "../../context/Auth";
import GoalsService from "../../services/firebase/goals-database";
import GoalCard from "./GoalCard/GoalCard";
import styles from "./Goals.module.css";
import { GoalData } from "../../types/goals";
import GoalPresenter from "../../presenter/goal-presenter";
import useModal from "../../hooks/useModal";

interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}
function Goals({ goalsService, goalsPresenter }: Props) {
  const { isLoggedin } = useContext(AuthContext);
  const [goalsList, setGoalsList] = useState<GoalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { modal, setModal, onClickBackground } = useModal();
  const navigate = useNavigate();

  const navigateToNewGoalPage = () => {
    navigate("new");
  };

  const showLoginModal = () => {
    setModal({
      isVisible: true,
      title: "Login",
      message: (
        <>
          <p>로그인이 필요한 서비스입니다.</p>
          <LoginForm setModal={setModal} />,
        </>
      ),
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await goalsService.getGoals();
      setGoalsList(data as GoalData[]);
    };

    getData() //
      .finally(() => setIsLoading(false));
  }, [goalsService]);

  return (
    <>
      <Modal modal={modal} onClickBackground={onClickBackground} hideButtons />
      <section className={`${styles.goals} page-layout`}>
        <button
          type="button"
          className={styles.newGoalLink}
          onClick={isLoggedin ? navigateToNewGoalPage : showLoginModal}
        >
          당신의 저축 목표를 만들어 사람들과 공유하세요!
        </button>
        {isLoading && <LoadingSpinner />}
        <section className={styles.cardContainer}>
          {goalsList &&
            goalsList.map((goalItem) => (
              <GoalCard
                key={`goal-list-${goalItem.id}`}
                data={goalItem}
                goalsPresenter={goalsPresenter}
              />
            ))}
        </section>
      </section>
    </>
  );
}

export default Goals;
