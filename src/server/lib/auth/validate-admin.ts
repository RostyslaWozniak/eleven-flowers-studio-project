import { env } from "@/env";
import { isValidHash } from "./index";

export async function validateAdmin(authHeader: string | null) {
  if (!authHeader) return false;
  const [username, password] = Buffer.from(authHeader, "base64")
    .toString()
    .split(":");
  if (!username || !password) return false;
  if (
    (await isValidHash(username, env.ADMIN_HASHED_USERNAME)) &&
    (await isValidHash(password, env.ADMIN_HASHED_PASSWORD))
  ) {
    return true;
  }
  return false;
}
