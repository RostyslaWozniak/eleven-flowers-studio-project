type CollectionTranslation = {
  name: string;
};
type ProductTranslation = {
  name: string;
  description: string;
};

type Price = {
  size: string;
  price: number;
};

type Image = {
  url: string;
};

type Collection = {
  slug: string;
  translations: CollectionTranslation[];
};

export type Product = {
  id: string;
  slug: string;
  collection: Collection | null;
  translations: ProductTranslation[];
  prices: Price[];
  images: Image[];
};

// export type Product = {
//   id: string;
//   slug: string;
//   collection: { translations: { name: string }[]; slug: string } | null;
//   images: { url: string }[];
//   prices: { price: number; size: string }[];
//   translations: { name: string; description: string }[];
// };
