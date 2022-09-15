/* eslint-disable class-methods-use-this */
import { GoalData, SavedMoney } from "../../types/goals";

export default class StubGoalsService {
  collection: string;

  goalId: null | string;

  userId: null | string;

  constructor() {
    this.collection = "goals";
    this.goalId = null;
    this.userId = null;
  }

  async postGoal(data: GoalData | null) {
    try {
      if (!data) throw new Error("새로운 목표 post 실패(empty data)");
      return Promise.resolve("새로운 목표 post 성공");
    } catch (error) {
      return error;
    }
  }

  async getGoals(isError?: string) {
    try {
      if (isError === "error") throw new Error("목표 data 가져오기 실패");
      return Promise.resolve("목표 data 가져오기 성공");
    } catch (error) {
      return error;
    }
  }

  async getGoalById(goalId: string | null) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 목표 data 가져오기 실패");
      return Promise.resolve("id로 목표 data 가져오기 성공");
    } catch (error) {
      return error;
    }
  }

  async getGoalsByUserId(userId: string | null) {
    this.userId = userId;
    try {
      if (!userId) throw new Error("userId로 목표 data 가져오기 실패");
      return Promise.resolve("userId로 목표 data 가져오기 성공");
    } catch (error) {
      return error;
    }
  }

  async deleteGoalById(goalId: string | null) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 목표 삭제하기 실패");
      return Promise.resolve("id로 목표 삭제하기 성공");
    } catch (error) {
      return error;
    }
  }

  async patchGoalById(data: GoalData | null, goalId: string | null) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 목표 수정하기 실패(empty id)");
      if (!data) throw new Error("id로 목표 수정하기 실패(empty data)");
      return Promise.resolve("id로 목표 수정하기 성공");
    } catch (error) {
      return error;
    }
  }

  async saveMoneyById(money: SavedMoney | null, goalId: string | null) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 저축하기 실패(empty id)");
      if (!money) throw new Error("id로 저축하기 실패(empty money)");
      return Promise.resolve("id로 저축하기 성공");
    } catch (error) {
      return error;
    }
  }
}
