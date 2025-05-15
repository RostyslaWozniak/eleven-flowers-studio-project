"use client";

import { Text } from "@/components/ui/typography";
import { GoogleStars as GoogleStarsIcon } from "@/components/ui/icons";
import { GoogleLogo } from "@/components/ui/icons/google-logo";
import { api } from "@/trpc/react";

export function GoogleStars() {
  const { data, isLoading } = api.public.google.getRating.useQuery();

  return (
    <>
      {isLoading || !data ? (
        <div className="h-8 w-full" />
      ) : (
        <div className="flex items-center gap-3">
          <GoogleStarsIcon className="opacity-8=90 hidden lg:flex" />
          <Text size="lg" className="font-bold">
            {data.rating} Stars on
          </Text>
          <GoogleLogo />
        </div>
      )}
    </>
  );
}
