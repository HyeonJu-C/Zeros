import { BsShareFill as ShareIcon } from "react-icons/bs";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import styles from "./GoalDetail.module.css";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { GoalData } from "../../types/goals";
import GoalsService from "../../services/firebase/goals-database";
import GoalPresenter from "../../presenter/goal-presenter";
import useToastMessage from "../../hooks/useToastMessage";
import Title from "./Title/Title";

interface Props {
  goalsService: GoalsService;
  goalsPresenter: GoalPresenter;
}

function GoalDetail({ goalsService, goalsPresenter }: Props) {
  const [data, setData] = useState<GoalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toastMessage, setToastMessage } = useToastMessage();
  const params = useParams();
  const { goalId } = params;

  const onClickShare: MouseEventHandler = async () => {
    try {
      await navigator.share({
        title: "Zeros",
        text: `${
          data ? data.userName : "회원"
        } 님이 공유한 저축 목표를 확인해 보세요!`,
        url: window.location.href,
      });
    } catch (error) {
      setToastMessage({
        isVisible: true,
        title: "Fail",
        message: "공유하기 취소",
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const goalData = await goalsService.getGoalById(goalId as string);
      setData(goalData as GoalData);
    };

    getData() //
      .finally(() => setIsLoading(false));
  }, [goalId, goalsService]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <section className="page-layout">
          <Title data={data} goalsPresenter={goalsPresenter} />
          <Calendar data={data} goalsPresenter={goalsPresenter} />
          <button type="button" className={styles.share} onClick={onClickShare}>
            <span className="sr-only">페이지 링크 공유하기</span>
            <ShareIcon />
          </button>
        </section>
      )}
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </>
  );
}

export default GoalDetail;
