export * from "./cn";
export * from "./price";
export * from "./pagination";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
