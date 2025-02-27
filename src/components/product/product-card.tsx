import Image from "next/image";
import { H3, Text } from "@/components/ui/typography";
import { Badge } from "../ui/badge";
import { capitalizeString, cn, formatPrice } from "@/lib/utils";
import { type ProductDTO } from "@/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function ProductCard({
  product,
  className,
  textMobileLarge,
}: {
  product: ProductDTO;
  className?: string;
  textMobileLarge?: boolean;
}) {
  const t = useTranslations("product");
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
              {product.collection.name}
            </Badge>
          </Link>
        )}
        <Link
          href={
            product.collection
              ? `/collections/${product.collection.slug}/${product.slug}`
              : `/products/${product.slug}`
          }
        >
          <div className="relative flex h-full flex-col">
            <div className="relative aspect-[5/6] overflow-hidden">
              <Image
                className="object-cover"
                src={product.images[0] ?? "/images/bouquet-placeholder.jpg"}
                alt={product.name}
                sizes="(min-width: 1500px) 333px, (min-width: 1040px) calc(20.45vw + 30px), (min-width: 640px) calc(33.42vw - 18px), calc(50vw - 18px)"
                priority
                fill
              />
              <div className="absolute inset-0 -z-10 animate-pulse bg-secondary"></div>
            </div>
            <div className="flex flex-grow flex-col items-center justify-center space-y-2 px-2">
              <H3
                className={cn(
                  "mt-2 text-base font-normal group-hover:underline sm:text-lg md:text-2xl",
                  {
                    "text-2xl sm:text-2xl md:text-3xl": textMobileLarge,
                  },
                )}
              >
                {capitalizeString(product.name)}
              </H3>
              <Text
                size="subtitle"
                className={cn(
                  "text-base font-bold text-primary sm:text-lg md:text-2xl",
                  {
                    "text-xl md:text-2xl": textMobileLarge,
                  },
                )}
              >
                {t("price_from")}{" "}
                {product.prices[0] && formatPrice(product.prices[0].price)}
              </Text>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
