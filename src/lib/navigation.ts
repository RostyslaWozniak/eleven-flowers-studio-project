export const navigation = {
  home: "/",
  bukiety: "/bukiety",
  "flower-box": "/uslugi",
  balony: "/balony",
  kontakt: "/kontakt",
} as const;

export type Navigation = (typeof navigation)[keyof typeof navigation];

export type Navigations = typeof navigation;
