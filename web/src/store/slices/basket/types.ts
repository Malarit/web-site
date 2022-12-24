import { card } from "../product/types";

export type items = card & {count: number}

export interface basketState {
    totalPrice: number;
    items: items[];
}