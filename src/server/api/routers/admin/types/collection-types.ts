import { type routing } from "@/i18n/routing";

export type PrismaGetAdminCollections = {
  translations: {
    description: string;
    name: string;
    language: string;
  }[];
  slug: string;
  imageUrl: string;
  id: string;
};

export type AdminCollectionDto = {
  id: string;
  slug: string;
  imageUrl: string;
  name: { name: string; lang: (typeof routing.locales)[number] }[];
  description: {
    description: string;
    lang: (typeof routing.locales)[number];
  }[];
};
