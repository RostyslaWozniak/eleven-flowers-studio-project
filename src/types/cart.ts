export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  slug: string;
  price: number | null;
  size: string;
  imageUrl: string;
  quantity: number;
};
