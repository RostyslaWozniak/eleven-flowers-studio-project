import { Link } from "@/i18n/routing";
import Image from "next/image";
import { H3 } from "../../../components/ui/typography";

import { getCollections } from "../cache/get-collections";
import { getLocale } from "next-intl/server";
import { validateLang } from "@/lib/utils";

export async function CollectionCards({ take }: { take?: number }) {
  const locale = await getLocale().then(validateLang);
  const collections = await getCollections({ locale, take });

  return (
    <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
      {collections.slice(0, take).map(({ slug, name, imageUrl }, i) => (
        <Link
          href={`/collections/${slug}`}
          key={i}
          className="group relative grid aspect-square min-w-[300px] place-items-center overflow-hidden"
        >
          <Image
            priority
            width={300}
            height={400}
            src={imageUrl}
            alt={name}
            className="absolute w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />

          <H3 className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-nowrap capitalize text-background lg:text-4xl">
            {name}
          </H3>

          <div className="absolute inset-0 z-10 backdrop-brightness-90 duration-300 ease-in-out group-hover:backdrop-brightness-75"></div>
        </Link>
      ))}
    </div>
  );
}
