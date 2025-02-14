import { env } from "@/env";
import { Redis } from "@upstash/redis";
import { type Duration, Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const rateLimiter = (times: number, duration: Duration) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, duration),
  });
