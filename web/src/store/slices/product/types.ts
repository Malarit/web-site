export interface card {
  id: number;
  category_id: number;
  title: string;
  price: number;
  imgUrl: { id: number; url: string }[];
  rating: { value: number; count: number };
  discount?: number;
  description: string;
  weight: string;
  brand: { id: number; name: string };
  packaging: string;
}

export interface ifetchProducts {
  left?: number;
  right?: number;
  tree_id?: number;
  discount: number;
  limit?: number;
  page?: number;
  price?: { left: number; right: number };
  brand_id?: number;
  favourite?: number[];
}
