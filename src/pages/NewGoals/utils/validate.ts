/* eslint-disable prettier/prettier */
import { GoalData } from "../../../services/firebase/database";

const checkFormValid = (inputValues: GoalData) => {
    const { userName, targetDate, goalSavings } = inputValues;

    let isFormValid;
    const feedback = [];

    if (!userName || !targetDate || !goalSavings) {
        isFormValid = false;
        feedback.push("양식을 모두 입력해 주세요.")
        return { isFormValid, feedback };
    }

    const isUserNameValid = userName.length >= 2 && userName.length <= 10;
    const isTargetDateValid = !!targetDate;
    const isGoalSavingsValid = goalSavings >= 100000;

    if (!isUserNameValid) feedback.push("이름은 2글자 이상, 10글자 이하로 작성해 주세요.");
    if (!isTargetDateValid) feedback.push("목표 기한을 선택해 주세요.");
    if (!isGoalSavingsValid) feedback.push("목표 금액은 최소 10 만원 이상으로 입력해 주세요.");

    isFormValid = isUserNameValid && isTargetDateValid && isGoalSavingsValid;


    return { isFormValid, feedback };
};

export default checkFormValid;
