import { type Product } from "@/app/types";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, H3, Text } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn, formatPrice } from "@/lib/utils";
import { db } from "@/server/db";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export async function generateStaticParams() {
  const collections = await db.collection.findMany({
    select: {
      slug: true,
    },
  });

  return collections.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const { slug } = await params;

  const collectionData = await db.collection.findUnique({
    where: {
      slug,
    },
    select: {
      translations: {
        where: {
          language: locale,
        },
      },
    },
  });
  const collectionTitle = `${collectionData?.translations[0]?.name.slice(0, 1).toUpperCase()}${collectionData?.translations[0]?.name.slice(1)} | Eleven Flowers Studio`;
  return {
    title: collectionTitle,
    description: `This is collection - ${collectionTitle}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const locale = await getLocale();

  const collection = await db.collection.findUnique({
    where: { slug },
    select: {
      translations: {
        where: {
          language: locale,
        },
        select: {
          name: true,
        },
      },
    },
  });

  const products: Product[] = await db.product.findMany({
    where: {
      collection: {
        slug: slug,
      },
    },
    select: {
      id: true,
      slug: true,
      collection: {
        select: {
          slug: true,
          translations: {
            where: {
              language: locale,
            },
            select: {
              name: true,
            },
          },
        },
      },
      images: {
        select: {
          url: true,
        },
      },
      prices: {
        select: {
          price: true,
          size: true,
        },
        orderBy: {
          price: "asc",
        },
      },
      translations: {
        where: {
          language: locale,
        },
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

  return (
    <MaxWidthWrapper className="my-24 space-y-14">
      <H1 className="capitalize">
        {collection?.translations[0]
          ? collection?.translations[0]?.name
          : slug.replace("-", " ")}
      </H1>
      <div className="grid grid-cols-3">
        {[...products, ...products, ...products].map((product, i) => (
          <div
            key={i}
            className={cn("w-full max-w-[350px] space-y-3 text-center")}
          >
            <div className="group relative space-y-4">
              {product.collection && (
                <Link href={`/collections/${product.collection.slug}`}>
                  <Badge className="absolute left-2 top-3 z-20">
                    {product.collection.translations[0]?.name}
                  </Badge>
                </Link>
              )}
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-[5/6] overflow-hidden bg-primary">
                  <Image
                    className="object-cover duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-0 group-hover:brightness-90"
                    src={
                      product.images[0]?.url ??
                      "/images/bouquet-placeholder.jpg"
                    }
                    alt={product.translations[0]?.name ?? "image"}
                    fill
                  />
                  <Image
                    className="object-cover opacity-0 duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-90"
                    src={
                      product.images[1]?.url ??
                      "/images/bouquet-placeholder.jpg"
                    }
                    alt={product.translations[0]?.name ?? "image"}
                    fill
                  />
                </div>
                <div className="mt-2 space-y-2">
                  <H3 className="font-normal capitalize group-hover:underline">
                    {product.translations[0]?.name}
                  </H3>
                  <Text
                    size="subtitle"
                    className="text-2xl font-bold text-primary"
                  >
                    {product.prices[0] && formatPrice(product.prices[0].price)}
                  </Text>
                </div>
              </Link>
            </div>
            <div>
              <div className="px-4">
                <Button>Add to cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
