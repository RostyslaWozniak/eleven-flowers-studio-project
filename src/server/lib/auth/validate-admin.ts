import { env } from "@/env";
import { isValidPassword } from "./index";

export async function validateAdmin(authHeader: string | null) {
  if (!authHeader) return false;
  const [username, password] = Buffer.from(authHeader, "base64")
    .toString()
    .split(":");
  if (!username || !password) return false;
  if (
    username === env.ADMIN_USERNAME &&
    (await isValidPassword(password, env.ADMIN_HASHED_PASSWORD))
  ) {
    return true;
  }
  return false;
}
