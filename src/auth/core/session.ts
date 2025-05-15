import { redisClient } from "@/lib/redis";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from "./constants";
import type { Cookies, UserSession } from "./types";
import { sessionSchema } from "./schema";

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  return getUserSessionById(sessionId);
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">,
) {
  const sessionId = crypto.randomUUID();

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });
}

export async function removeUserFromSession(
  coockies: Pick<Cookies, "get" | "delete">,
) {
  const sessionId = coockies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return;

  await redisClient.del(`session:${sessionId}`);
  coockies.delete(COOKIE_SESSION_KEY);
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  const user = await getUserSessionById(sessionId);
  if (user == null) return;

  await redisClient.set(`session:${sessionId}`, user, {
    ex: SESSION_EXPIRATION_SECONDS,
  });
  setCookie(sessionId, cookies);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  return success ? user : null;
}
