import { env } from "@/env";
import { getCurrentUser } from "./current-user";

export async function isAdmin() {
  const user = await getCurrentUser();

  if (
    user?.username === env.ADMIN_HASHED_USERNAME &&
    user?.passwordHash === env.ADMIN_HASHED_PASSWORD
  ) {
    return true;
  }
  return false;
}
