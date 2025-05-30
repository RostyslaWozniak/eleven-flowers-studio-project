import { env } from "@/env";
import { validateLang } from "@/lib/utils";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";
import { getLocale } from "next-intl/server";

const GOOGLE_PLACE_URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${env.GOOGLE_PLACE_ID}&key=${env.GOOGLE_API_KEY}`;

export const googleRouter = createTRPCRouter({
  getRating: publicProcedure.query(async () => {
    const response = await fetch(`${GOOGLE_PLACE_URL}&fields=rating`, {
      next: {
        revalidate: 86400, // 1 day in seconds
      },
    });

    const data = (await response.json()) as { result: { rating: number } };

    return { rating: data.result.rating };
  }),

  getTestmonials: publicProcedure.query(async () => {
    const locale = await getLocale().then(validateLang);
    const response = await fetch(
      `${GOOGLE_PLACE_URL}&fields=reviews&language=${locale}`,
      {
        next: {
          revalidate: 86400, // 1 day in seconds
        },
      },
    );

    const data = (await response.json()) as {
      result: {
        reviews: {
          author_name: string;
          author_url: string;
          language: string;
          original_language: string;
          profile_photo_url: string;
          rating: number;
          relative_time_description: string;
          text: string;
        }[];
      };
    };

    return {
      reviews: data.result.reviews.map((review) => ({
        name: review.author_name,
        photo: review.profile_photo_url,
        text: review.text,
        rating: review.rating,
      })),
    };
  }),
});
