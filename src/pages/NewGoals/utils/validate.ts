export const validateUserName = (value: string) => {
  let isValid = false;
  if (!value) return isValid;

  isValid = value.length >= 2 && value.length <= 10;
  return isValid;
};

export const validateGoalSaving = (value: string) => {
  let isValid = false;
  if (!value) return isValid;

  isValid = +value >= 100000;
  return isValid;
};
