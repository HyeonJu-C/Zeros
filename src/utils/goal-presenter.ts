import { format, parseJSON } from "date-fns";
import { SavedMoney } from "../types/goals";

export default class GoalPresenter {
  currentMoney: SavedMoney[] | null;

  goalDate: string | null;

  goalMoney: number | null;

  goalTitle: string | null;

  constructor() {
    this.currentMoney = null;
    this.goalDate = null;
    this.goalMoney = null;
    this.goalTitle = null;
  }

  parseGoalDate(goalDate: string) {
    this.goalDate = goalDate;
    return parseJSON(this.goalDate);
  }

  formatGoalDate(goalDate: string) {
    const parsedGoalDate = this.parseGoalDate(goalDate);
    return format(parsedGoalDate, "yyyy년 MM월 dd일");
  }

  calculateAcheiveRate(currentMoney: SavedMoney[], goalMoney: number) {
    this.currentMoney = currentMoney;
    this.goalMoney = goalMoney;
    const totalSavedMoney = this.currentMoney //
      ?.map(({ money }) => money)
      .reduce((prev, current) => prev + current, 0);

    const acheiveRate = (totalSavedMoney / +this.goalMoney) * 100;

    return acheiveRate;
  }

  formatAcheiveRate(currentMoney: SavedMoney[], goalMoney: number) {
    const acheiveRate = this.calculateAcheiveRate(currentMoney, goalMoney);
    // 참고) 0도 falsy한 값으로 취급된다
    if (!acheiveRate) return 0;

    const isRateInteger = Number.isInteger(acheiveRate);
    const formattedAcheiveRate = isRateInteger
      ? acheiveRate
      : acheiveRate.toFixed(1);

    return formattedAcheiveRate;
  }

  formatGoalTitle(goalTitle: string) {
    this.goalTitle = goalTitle;
    const isLong = this.goalTitle.length >= 15;

    const formattedGoalTitle = !isLong
      ? this.goalTitle
      : this.goalTitle.slice(0, 14).concat("...");

    return formattedGoalTitle;
  }

  formatMoney(goalMoney: number) {
    this.goalMoney = goalMoney;

    let isGoalInteger;
    let formattedGoal;
    const stringifiedMoney = this.goalMoney.toString();

    switch (true) {
      // 1만 원 이상 ~ 1억 원 미만
      case this.goalMoney >= 10000 && this.goalMoney < 100000000:
        isGoalInteger = Number.isInteger(this.goalMoney / 10000);
        formattedGoal = isGoalInteger
          ? `${(this.goalMoney / 10000).toLocaleString()}만 원`
          : `${Math.floor(
              +this.goalMoney / 10000
            ).toLocaleString()}만 ${Math.round(
              +stringifiedMoney.slice(-4, stringifiedMoney.length)
            ).toLocaleString()}원`;
        break;

      // 목표 금액: 1억원 이상
      case +this.goalMoney >= 100000000:
        isGoalInteger = Number.isInteger(+this.goalMoney / 100000000);
        formattedGoal = isGoalInteger
          ? `${(+this.goalMoney / 100000000).toLocaleString()}억 원`
          : `${Math.floor(
              +this.goalMoney / 100000000
            ).toLocaleString()}억 ${Math.round(
              +stringifiedMoney.slice(-8, stringifiedMoney.length) / 10000
            ).toLocaleString()}만 원`;
        break;

      // 1만 원 미만
      default:
        formattedGoal = `${(+this.goalMoney).toLocaleString()} 원`;
        break;
    }

    return formattedGoal;
  }
}
