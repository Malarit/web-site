export const getPercentage = (num: number, percentage: number) => {
  return Math.round(num - num * (percentage / 100));
};
