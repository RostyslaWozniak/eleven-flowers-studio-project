import { env } from "@/env";
import { cookies } from "next/headers";

export async function isAuth(headers: Headers): Promise<boolean> {
  const authHeader =
    headers.get("Authorization") ?? headers.get("authorization");

  if (!authHeader) return false;

  const [username, password] = Buffer.from(
    authHeader.split(" ")[1] ?? "",
    "base64",
  )
    .toString()
    .split(":");

  if (!username || !password) return false;
  if (
    (await isValidHash(username, env.ADMIN_HASHED_USERNAME)) &&
    (await isValidHash(password, env.ADMIN_HASHED_PASSWORD))
  ) {
    (await cookies()).set("token", authHeader.split(" ")[1] ?? "");
    return true;
  } else {
    const hashedUsername = await hashString(username);
    const hashedPassword = await hashString(password);
    console.error({ username: hashedUsername, password: hashedPassword });
  }
  return false;
}

export async function isValidHash(password: string, hashedPassword: string) {
  return (await hashString(password)) === hashedPassword;
}

async function hashString(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password),
  );

  return Buffer.from(arrayBuffer).toString("base64");
}
