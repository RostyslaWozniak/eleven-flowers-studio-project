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
    <div className="grid grid-cols-2 place-items-center gap-4 lg:grid-cols-4">
      {collections.slice(0, take).map(({ slug, name, imageUrl }, i) => (
        <div
          key={i}
          className="group relative isolate grid aspect-square max-w-[350px] overflow-hidden"
        >
          <Image
            priority
            width={400}
            height={400}
            src={imageUrl}
            alt={name}
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />

          <H3 className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-nowrap capitalize text-background xl:text-4xl">
            {name}
          </H3>

          <div className="absolute inset-0 z-10 backdrop-brightness-75 duration-300 ease-in-out md:backdrop-brightness-90 md:group-hover:backdrop-brightness-75" />
          <Link
            href={`/collections/${slug}`}
            className="absolute inset-0 z-50"
          />
        </div>
      ))}
    </div>
  );
}
