import { type Metadata } from "next";
import { Sidebar } from "../_components/sidebar";
export const metadata: Metadata = {
  title: {
    template: "Admin | %s | Eleven Flowers Studio",
    default: "Admin | Eleven Flowers Studio",
  },
  description: "The e-commerce platform for tea products",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative mx-auto flex min-h-[calc(100vh-240px)] max-w-7xl grow justify-between">
      <Sidebar />
      <div className="relative grow px-10 py-5">{children}</div>
    </div>
  );
}
