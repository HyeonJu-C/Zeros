/* eslint-disable @typescript-eslint/no-shadow */
import { parseJSON } from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Query,
} from "firebase/firestore";
import { firestore } from "./config";

const goalsCollection = collection(firestore, "goals");

export interface GoalData {
  uid?: string;
  id?: string;
  userName?: string;
  targetDate?: string | Date;
  goalSavings?: string | number;
  currentSavings?: string | number;
  processedGoalSavings?: string | number;
  acheiveRate?: number;
}

export const postGoal = async (data: GoalData) => {
  try {
    await addDoc(goalsCollection, data);
  } catch (error) {
    console.log(error);
  }
};

export const getGoals = async (query: Query<object> = goalsCollection) => {
  const data = await getDocs(query);
  const goals: GoalData[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const processedGoals = goals.map((goal) => ({
    ...goal,
    targetDate: parseJSON(goal.targetDate as string),
    processedGoalSavings: (
      +(goal.goalSavings as string) / 10000
    ).toLocaleString("en-US"),
    acheiveRate:
      (+(goal.currentSavings as string) / +(goal.goalSavings as string)) * 100,
  }));
  return processedGoals;
};

export const deleteGoal = async (id: string) => {
  const targetGoal = doc(firestore, "goals", id);
  await deleteDoc(targetGoal);
};
