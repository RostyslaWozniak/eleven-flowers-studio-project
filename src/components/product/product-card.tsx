import Image from "next/image";
import { H3, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import { Badge } from "../ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { type Product } from "@/types";
import { Link } from "@/i18n/routing";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const t = useTranslations("ProductPage");
  return (
    <div
      className={cn(
        "flex h-full w-full max-w-[400px] flex-col space-y-3 text-center",
        className,
      )}
    >
      <div className="group relative flex-grow">
        {product.collection && (
          <Link href={`/collections/${product.collection.slug}`}>
            <Badge className="absolute left-2 top-3 z-20">
              {product.collection.translations[0]?.name}
            </Badge>
          </Link>
        )}
        <Link href={`/products/${product.slug}`}>
          <div className="relative flex h-full flex-col">
            <div className="relative aspect-[5/6] overflow-hidden bg-primary">
              <Image
                className="object-cover duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-0 group-hover:brightness-90"
                src={
                  product.images[0]?.url ?? "/images/bouquet-placeholder.jpg"
                }
                alt={product.translations[0]?.name ?? "image"}
                fill
              />
              <Image
                className="object-cover opacity-0 duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-90"
                src={
                  product.images[1]?.url ?? "/images/bouquet-placeholder.jpg"
                }
                alt={product.translations[0]?.name ?? "image"}
                fill
              />
            </div>
            <div className="flex flex-grow flex-col items-center justify-center space-y-2 px-2">
              <H3 className="mt-2 font-normal capitalize group-hover:underline">
                {product.translations[0]?.name}
              </H3>
              <Text size="subtitle" className="text-2xl font-bold text-primary">
                {product.prices[0] && formatPrice(product.prices[0].price)}
              </Text>
            </div>
          </div>
        </Link>
      </div>
      <div className="px-2 lg:px-3">
        <Button>{t("addToCart")}</Button>
      </div>
    </div>
  );
}
