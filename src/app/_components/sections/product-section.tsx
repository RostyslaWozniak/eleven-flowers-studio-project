import { type Product } from "@/types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { H1, H3, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ProductSection({ product }: { product: Product }) {
  const t = useTranslations("ProductPage");
  return (
    <section className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="grid gap-x-8 md:grid-cols-2">
        <div className="flex flex-col space-y-4 py-8 xl:p-12">
          <div className="relative aspect-square lg:h-full">
            <Image
              fill
              priority
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 500px"}
              src={product.images[0]?.url ?? "/images/bouquet-placeholder.jpg"}
              alt={product.translations[0]?.name ?? "image"}
              className="aspect-square w-full object-cover shadow-lg"
            />
          </div>
          <div className="flex h-[100px] w-full grid-cols-3 items-start justify-start gap-x-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square h-full">
                <Image
                  fill
                  priority
                  sizes={"(max-width: 768px) 200px, (max-width: 1200px) 100px"}
                  src={image.url ?? "/images/bouquet-placeholder.svg"}
                  alt={`${product.collection?.translations[0]?.name} - View ${index + 1}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-6 lg:pt-28">
          <div>
            <H1 className="capitalize">{product.translations[0]?.name}</H1>
            <Link
              href={`/collections/${product.collection?.slug}`}
              className="mt-4 inline-block"
            >
              <Badge className="" variant="outline">
                {product.collection?.translations[0]?.name}
              </Badge>
            </Link>
          </div>
          <Text variant="muted" size="subtitle">
            {product.translations[0]?.description}
          </Text>
          <div>
            <H3 className="mb-2">{t("size")}</H3>
            <div className="flex space-x-4">
              {product.prices.map(({ size }, i) => (
                <Button
                  key={size}
                  className="flex w-min min-w-20 items-center space-x-2 capitalize"
                  variant={i === 0 ? "outline" : "secondary"}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="text-3xl font-bold">
            {product.prices[0] && formatPrice(product.prices[0]?.price)}
          </div>
          <div className="flex justify-center sm:justify-start">
            <Button className="">{t("addToCart")}</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
