import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { GoogleStars } from "../google-stars";
import { SectionWrapper } from "@/components/section-wrapper";
import { VideoPlayer } from "@/components/video-player";

export function HomeHeroSection() {
  const t = useTranslations("home.hero");

  return (
    <SectionWrapper
      className="-translate-y-14 from-card to-transparent py-0 md:translate-y-0 md:py-10 lg:bg-gradient-to-b lg:pb-0"
      paddingBlock="sm"
    >
      <MaxWidthWrapper className="-mb-20 flex w-full flex-col-reverse items-center justify-between gap-x-12 lg:mb-0 lg:grid lg:grid-cols-2 xl:grid-cols-5">
        <div className="z-20 flex w-full -translate-y-20 flex-col items-center gap-4 lg:translate-y-0 lg:items-start xl:col-span-3">
          <h1 className="text-center font-philosopher text-5xl font-normal tracking-tighter text-primary lg:text-start lg:text-6xl xl:text-7xl">
            Eleven Flowers Studio <br />
            <span className="hidden text-foreground/70 sm:block">
              {t("title")}
            </span>
          </h1>
          <p className="max-w-xl text-center text-base font-semibold tracking-[1px] text-foreground/70 sm:tracking-[2px] md:block lg:max-w-2xl lg:text-start xl:text-xl">
            {t("subtitle")}
          </p>
          <div className="mx-auto md:mx-0">
            <GoogleStars />
          </div>
          <div className="mt-4 flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
            <Link
              href="/products/new"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              {t("primary_button")}
            </Link>
            <Link
              href="/collections"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("secondary_button")}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[450px] w-screen max-w-[500px] overflow-hidden md:rounded-sm lg:h-[600px] xl:col-span-2">
          {/* <Image
            priority
            fill
            className="z-10 -translate-y-14 bg-slate-100 object-cover lg:translate-y-0"
            src="/images/hero.jpg"
            alt="Eleven Flowers Studio"
          /> */}
          <VideoPlayer />
          <div className="absolute -bottom-1 z-10 flex h-64 w-full items-end justify-center bg-gradient-to-b from-transparent via-background/50 to-background px-2.5 lg:hidden"></div>
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
// export function HomeHeroSection() {
//   const t = useTranslations("home.hero");

//   return (
//     <SectionWrapper
//       className="bg-gradient-to-b from-card to-transparent py-0 md:pb-0"
//       paddingBlock="sm"
//     >
//       <MaxWidthWrapper className="hidden items-center justify-between gap-16 md:flex lg:pt-12">
//         <div className="flex flex-col items-start gap-8">
//           <div className="space-y-4">
//             <H1 className="text-nowrap font-normal lg:text-7xl">
//               Eleven Flowers Studio <br></br>{" "}
//               <span className="text-foreground/70">{t("title")}</span>
//             </H1>
//             <Text size="subtitle" variant="muted" className="text-base">
//               {t("subtitle")}
//             </Text>
//           </div>
//           <GoogleStars />
//           <div className="flex items-center gap-8">
//             <Link
//               href="/products/new"
//               className={cn(buttonVariants({ variant: "default" }))}
//             >
//               {t("primary_button")}
//             </Link>
//             <Link
//               href="/collections"
//               className={cn(buttonVariants({ variant: "outline" }))}
//             >
//               {t("secondary_button")}
//             </Link>
//           </div>
//         </div>
//         <div className="relative h-[600px] min-w-[500px] overflow-hidden rounded-sm">
//           <Image
//             priority
//             width={500}
//             height={600}
//             className="z-10 h-auto min-w-[500px] rounded-sm bg-slate-100 object-cover"
//             src="/images/hero.jpg"
//             alt="Eleven Flowers Studio"
//           />
//         </div>
//       </MaxWidthWrapper>
//       <div className="relative md:hidden">
//         <Image
//           className="w-full"
//           priority
//           src="/images/hero-mobile.jpg"
//           alt="Eleven Flowers Studio"
//           width={550}
//           height={650}
//         />
//         <div className="absolute -bottom-0 flex h-60 w-full items-end justify-center bg-gradient-to-b from-transparent via-background/30 to-background px-2.5">
//           <Link
//             href="/products/new"
//             className={cn(buttonVariants({ variant: "outline" }))}
//           >
//             {t("primary_button")}
//           </Link>
//         </div>
//       </div>
//     </SectionWrapper>
//   );
// }
