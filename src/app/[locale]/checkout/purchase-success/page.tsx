import { buttonVariants } from "@/components/ui/button";
import { Logo2 } from "@/components/ui/logo";
import { H1, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-20 px-2.5 py-20 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-center text-center">
          <div className="max-w-lg space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Logo2 />
              </div>
              <H1 className="text-4xl lg:text-6xl">Order Successful!</H1>
              <Text className="">
                {
                  "Thank you for your purchase. Your beautiful blooms are on their way to brighten someone's day!"
                }
              </Text>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                href="/products"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Continue Shopping
              </Link>
            </div>
            <Text size="sm">Order #12345 • May 15, 2023</Text>
          </div>
        </div>
      </div>
    </section>
  );
}
