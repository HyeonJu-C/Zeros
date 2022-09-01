import { parseJSON } from "date-fns";

export const getExpiresinTime = () => {
  const expiresIn = localStorage.getItem("expiresIn");

  if (typeof expiresIn === "string") return parseJSON(expiresIn);
  return null;
};

export const calculateRemainigTime = (expireTime: Date, now: Date) => {
  return expireTime.getTime() - now.getTime();
};
