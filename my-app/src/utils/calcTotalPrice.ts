import { card } from "../features/basket/types";
import { getPercentage } from "./getPercentage";

export const calcTotalPrice = (obj: card[]):number => {
  return obj.reduce((sum, obj) => {
    const value = getPercentage(obj.price, obj.discount || 0);
    return value * (obj.count || 1) + sum;
  }, 0);
};
