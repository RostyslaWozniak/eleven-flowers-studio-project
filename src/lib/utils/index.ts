export * from "./cn";
export * from "./price";
export * from "./pagination";
export * from "./validate-lang";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalizeString(str: string) {
  return str
    .split(" ")
    .map((word) =>
      word.length > 2 ? word.slice(0, 1).toUpperCase() + word.slice(1) : word,
    )
    .join(" ");
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
