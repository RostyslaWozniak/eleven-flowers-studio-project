import { Link } from "@/i18n/routing";
import Image from "next/image";
import { H3 } from "./ui/typography";
import { api } from "@/trpc/server";

export async function CollectionsPreview({ take = 4 }: { take?: number }) {
  const collections = await api.public.collections.getAllCollections({
    take,
  });
  return (
    <div className="scrollbar-hide flex w-full gap-4 overflow-x-scroll px-2.5 xl:grid xl:grid-cols-4 xl:gap-8">
      {collections.map(({ slug, name, imageUrl }, i) => (
        <Link
          href={`/collections/${slug}`}
          key={i}
          className="group relative grid aspect-square min-w-[300px] place-items-center overflow-hidden"
        >
          <Image
            fill
            priority
            sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 300px "}
            src={imageUrl}
            alt={name}
            className="absolute object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
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
