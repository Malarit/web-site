export type user =
  | {
      id: number;
      username: string;
      favourite_product: number[]
    }
  | undefined;
