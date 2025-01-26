export const navigation = {
  home: "/",
  bouquets: "/bouquets",
  gifts: "/gifts",
  contact: "/contact",
} as const;

export type Navigation = (typeof navigation)[keyof typeof navigation];

export type Navigations = typeof navigation;
