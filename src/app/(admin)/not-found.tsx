import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H1, Text } from "@/components/ui/typography";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section>
      <MaxWidthWrapper className="flex min-h-[600px] flex-col items-center justify-center">
        <H1 className="text-9xl lg:text-9xl">404</H1>
        <Text size="subtitle" variant="muted" className="mb-8 mt-4">
          Not Found
        </Text>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back to Dashboard
        </Link>
      </MaxWidthWrapper>
    </section>
  );
}
