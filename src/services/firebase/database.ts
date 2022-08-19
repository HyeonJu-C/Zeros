/* eslint-disable prettier/prettier */
import { addDoc, collection, getDocs, Query } from "firebase/firestore";
import { firestore } from "./config";

const goalsCollection = collection(firestore, "goals");

export interface GoalData {
    uid?: string;
    id?: string;
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

export const getGoals = async (query: Query<object> = goalsCollection) => {
    const data = await getDocs(query);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}