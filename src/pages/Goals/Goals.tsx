import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Modal, { ModalState } from "../../components/Modal/Modal";
import AuthContext from "../../context/Auth";
import GoalsService from "../../services/firebase/goals-database";
import GoalCard from "./GoalCard/GoalCard";
import styles from "./Goals.module.css";
import { GoalData } from "../../types/goals";

interface Props {
  goalsService: GoalsService;
}
function Goals({ goalsService }: Props) {
  const { isLoggedin } = useContext(AuthContext);
  const [goalsList, setGoalsList] = useState<GoalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ isVisible: false });
  const navigate = useNavigate();

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

  const navigateToGoalsForm = () => {
    navigate("new");
  };

  useEffect(() => {
    const getData = async () => {
      const data = await goalsService.getGoals();
      if (!data) throw new Error("데이터 가져오기 실패");
      setGoalsList(data as GoalData[]);
      setIsLoading(false);
    };

    getData()
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [goalsService]);

  return (
    <>
      <main className={`${styles.goals} page-layout`}>
        <button
          type="button"
          className={styles.newGoalLink}
          onClick={isLoggedin ? navigateToGoalsForm : showLoginModal}
        >
          당신의 저축 목표를 만들어 사람들과 공유하세요!
        </button>
        {isLoading && <LoadingSpinner />}
        <section className={styles.cardContainer}>
          {goalsList?.map((goalItem) => (
            <GoalCard key={goalItem.id} data={goalItem} />
          ))}
        </section>
      </main>
      {modal.isVisible && (
        <Modal
          setModal={setModal}
          title={modal.title}
          message={modal.message}
          hideButtons
        />
      )}
    </>
  );
}

export default Goals;
