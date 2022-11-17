export interface card {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  rating: { value: number; count: number };
  discount?: number;
  count?: number;
}

