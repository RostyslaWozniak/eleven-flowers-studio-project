"use client";

import { GoogleStars as GoogleStarsIcon } from "@/components/ui/icons";
import { GoogleLogo } from "@/components/ui/icons/google-logo";
import { api } from "@/trpc/react";

export function GoogleStars() {
  const { data } = api.public.google.getRating.useQuery();

  return (
    <div className="flex items-center gap-3">
      <GoogleStarsIcon />
      <p className="text-base font-bold md:text-lg">
        <span className="inline-block min-w-8">{!!data && data.rating}</span> on
      </p>
      <GoogleLogo />
    </div>
  );
}
