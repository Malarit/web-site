import { card } from "../product/types";

export type basket = card & {count: number}

export interface basketState {
    totalPrice: number;
    items: basket[];
}