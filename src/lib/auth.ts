import { env } from "@/env";

export async function isAuth(headers: Headers): Promise<boolean> {
  // console.log(req);
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

  return (
    username === env.ADMIN_USERNAME &&
    (await isValidPassword(password, env.ADMIN_HASHED_PASSWORD))
  );
}

async function isValidPassword(password: string, hashedPassword: string) {
  return (await hashPassword(password)) === hashedPassword;
}

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password),
  );

  return Buffer.from(arrayBuffer).toString("base64");
}
