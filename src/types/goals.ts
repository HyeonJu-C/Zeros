import { regularObject } from "./common";

export interface SavedMoney {
  date: string;
  money: number;
}

export interface GoalData extends regularObject {
  currentMoney?: SavedMoney[];
  goalDate?: string;
  goalMoney?: number;
  goalTitle?: string;
  userId?: string;
  userName?: string;
  id?: string;
}
