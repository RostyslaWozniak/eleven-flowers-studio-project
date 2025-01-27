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
