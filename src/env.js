import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    ADMIN_HASHED_USERNAME: z.string().min(1),
    ADMIN_HASHED_PASSWORD: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    RESEND_DOMAIN: z.string().min(1),
    RESEND_FROM_NAME: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
    GOOGLE_API_KEY: z.string().min(1),
    GOOGLE_PLACE_ID: z.string().min(1),
    TELEGRAM_ACCESS_TOKEN: z.string().min(1),
    TELEGRAM_CHAT_IDS: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_UPLOADTHING_APP_ID: z.string().min(1),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_UPLOADTHING_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
    ADMIN_HASHED_USERNAME: process.env.ADMIN_HASHED_USERNAME,
    ADMIN_HASHED_PASSWORD: process.env.ADMIN_HASHED_PASSWORD,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    RESEND_DOMAIN: process.env.RESEND_DOMAIN,
    RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_PLACE_ID: process.env.GOOGLE_PLACE_ID,
    TELEGRAM_ACCESS_TOKEN: process.env.TELEGRAM_ACCESS_TOKEN,
    TELEGRAM_CHAT_IDS: process.env.TELEGRAM_CHAT_IDS,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
