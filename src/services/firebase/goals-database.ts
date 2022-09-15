/* eslint-disable @typescript-eslint/no-shadow */
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { GoalData, SavedMoney } from "../../types/goals";
import { firestore } from "./config";

export default class GoalsService {
  collection;

  goalId: null | string;

  userId: null | string;

  constructor() {
    this.collection = collection(firestore, "goals");
    this.goalId = null;
    this.userId = null;
  }

  async postGoal(data: GoalData) {
    try {
      if (!data) throw new Error("새로운 목표 post 실패(empty data)");
      await addDoc(this.collection, data);
      return "새로운 목표 post 성공";
    } catch (error) {
      return error;
    }
  }

  async getGoals() {
    try {
      const data = await getDocs(this.collection);
      const goals: GoalData[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return goals;
    } catch (error) {
      return error;
    }
  }

  async getGoalById(goalId: string) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 목표 data 가져오기 실패");
      const target = doc(firestore, "goals", goalId);
      const data = await getDoc(target);
      const goal: GoalData = { ...data.data(), id: data.id };
      return goal;
    } catch (error) {
      return error;
    }
  }

  async getGoalsByUserId(userId: string) {
    this.userId = userId;
    try {
      if (!userId) throw new Error("userId로 목표 data 가져오기 실패");

      const target = query(this.collection, where("userId", "==", this.userId));
      const data = await getDocs(target);

      const goals: GoalData[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return goals;
    } catch (error) {
      return error;
    }
  }

  async deleteGoalById(goalId: string) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 목표 삭제하기 실패");

      const target = doc(firestore, "goals", this.goalId);
      await deleteDoc(target);
      return "id로 목표 삭제하기 성공";
    } catch (error) {
      return error;
    }
  }

  async patchGoalById(data: GoalData, goalId: string) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 목표 수정하기 실패(empty id)");
      if (!data) throw new Error("id로 목표 수정하기 실패(empty data)");

      const target = doc(firestore, "goals", this.goalId);
      await updateDoc(target, data);
      return "id로 목표 수정하기 성공";
    } catch (error) {
      return error;
    }
  }

  async saveMoneyById(money: SavedMoney, goalId: string) {
    this.goalId = goalId;
    try {
      if (!goalId) throw new Error("id로 저축하기 실패(empty id)");
      if (!money) throw new Error("id로 저축하기 실패(empty money)");

      const target = doc(firestore, "goals", this.goalId);
      await updateDoc(target, {
        currentMoney: arrayUnion(money),
      });
      return "id로 저축하기 성공";
    } catch (error) {
      return error;
    }
  }
}
