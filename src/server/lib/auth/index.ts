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
    username === env.ADMIN_USERNAME &&
    (await isValidPassword(password, env.ADMIN_HASHED_PASSWORD))
  ) {
    (await cookies()).set("token", authHeader.split(" ")[1] ?? "");
    return true;
  } else {
    const hashedPassword = await hashPassword(password);
    console.error({ username, hashedPassword });
  }
  return false;
}

export async function isValidPassword(
  password: string,
  hashedPassword: string,
) {
  return (await hashPassword(password)) === hashedPassword;
}

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password),
  );

  return Buffer.from(arrayBuffer).toString("base64");
}
