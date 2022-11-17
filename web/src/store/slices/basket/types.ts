import { card } from "../product/types";

export interface basketState {
    totalPrice: number;
    items: card[];
}