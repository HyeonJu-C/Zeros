import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GoalsService from "../../services/firebase/goals-database";
import { GoalData } from "../../types/goals";
import styles from "./My.module.css";
import GoalPresenter from "../../utils/goal-presenter";
import GoalListItem from "./GoalListItem/GoalListItem";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import useToastMessage from "../../hooks/useToastMessage";

export enum Mode {
  DEFAULT = "DEFAULT",
  SAVE_MONEY = "SAVE_MONEY",
}
interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}

function My({ goalsService, goalsPresenter }: Props) {
  const params = useParams();
  const { userId } = params;
  const [myGoalList, setMyGoalList] = useState<GoalData[] | null>(null);
  const { toastMessage, setToastMessage } = useToastMessage();

  useEffect(() => {
    if (!userId) return;

    const getData = async () => {
      const response = await goalsService.getGoalsByUserId(userId);
      setMyGoalList(response as GoalData[]);
    };

    getData();
  }, [goalsService, userId, toastMessage]);

  return (
    <>
      <section className="page-layout">
        <Link to="/goals/new" className={styles.link}>
          새로운 목표 만들기
        </Link>
        {myGoalList?.length === 0 && (
          <p className={styles.noGoal}>아직 만든 목표가 없어요!</p>
        )}
        {myGoalList && (
          <ul className={styles.goalContainer}>
            {myGoalList.map((myGoal) => (
              <GoalListItem
                key={`my-goal-list-${myGoal.id}`}
                data={myGoal}
                goalsPresenter={goalsPresenter}
                goalsService={goalsService}
                setToastMessage={setToastMessage}
              />
            ))}
          </ul>
        )}
      </section>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </>
  );
}

export default My;
