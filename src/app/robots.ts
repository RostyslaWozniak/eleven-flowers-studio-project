import { type MetadataRoute } from "next";

import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/*"],
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_SERVER_URL}/sitemap.xml`,
  };
}
