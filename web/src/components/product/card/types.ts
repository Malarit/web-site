import { card } from "../../../store/slices/product/types";

export type classes = {
  cardRoot?: string;
  cardFavorite?: string;
  cardRating?: string;
  cardTitle?: string;
  cardPrice?: string;
  cardButton?: string;
};

export type cardComponents = {
  card: card;
  classes?: classes;
}