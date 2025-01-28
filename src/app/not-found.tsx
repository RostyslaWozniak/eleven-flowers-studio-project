import { type Metadata } from "next";
import { NotFoundSection } from "./_components/sections/not-found-section";

export const metadata: Metadata = {
  title: "404 | Eleven Flowers Studio",
  description: "The e-commerce platform for flower products",
};

export default function NotFound() {
  return <NotFoundSection />;
}
