export const getPercentage = (num: number, percentage: number) => {
  return num - num * (percentage / 100);
};
