/* eslint-disable prettier/prettier */
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./config";

const goalsCollection = collection(firestore, "goals");

export interface GoalData {
    uid: string;
    userName?: string;
    targetDate?: string;
    goalSavings?: string | number;
    currentSavings?: string | number;
}

export const postGoal = async (data: GoalData) => {
    try {
        await addDoc(goalsCollection, data);
    } catch (error) {
        console.log(error);
    }
};
