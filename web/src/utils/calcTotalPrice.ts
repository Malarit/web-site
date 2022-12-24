import { basketState } from "../store/slices/basket/types";
import { getPercentage } from "./getPercentage";

export const calcTotalPrice = (obj: basketState): number => {
  return obj.items.reduce((sum, obj) => {
    const value = getPercentage(obj.price, obj.discount || 0);
    return value * (obj.count || 1) + sum;
  }, 0);
};
