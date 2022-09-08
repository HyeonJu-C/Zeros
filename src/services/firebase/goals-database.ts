/* eslint-disable @typescript-eslint/no-shadow */
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { GoalData, SavedMoney } from "../../types/goals";
import { firestore } from "./config";

const goalsCollection = collection(firestore, "goals");

export const postGoal = async (data: GoalData) => {
  await addDoc(goalsCollection, data);
};

export const getGoals = async () => {
  const data = await getDocs(goalsCollection);

  const goals: GoalData[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return goals;
};

export const getGoal = async (id: string) => {
  const targetGoal = doc(firestore, "goals", id);

  const data = await getDoc(targetGoal);
  const goal: GoalData = { ...data.data(), id: data.id };
  return goal;
};

export const deleteGoal = async (id: string) => {
  const targetGoal = doc(firestore, "goals", id);

  await deleteDoc(targetGoal);
};

export const patchGoal = async (id: string, data: GoalData) => {
  const targetGoal = doc(firestore, "goals", id);

  await updateDoc(targetGoal, data);
};

export const addSavedMoney = async (id: string, money: SavedMoney) => {
  const targetGoal = doc(firestore, "goals", id);

  await updateDoc(targetGoal, {
    currentMoney: arrayUnion(money),
  });
};
