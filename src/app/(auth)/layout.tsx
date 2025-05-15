import "@/styles/globals.css";

import { Manrope, Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${manrope.variable} ${philosopher.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden font-manrope">
        {children}
      </body>
    </html>
  );
}
