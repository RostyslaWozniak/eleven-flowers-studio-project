import { cache } from "react";
import { getUserFromSession } from "./core/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: { redirectIfNotFound: true }): Promise<User>;
function _getCurrentUser(options?: {
  redirectIfNotFound?: false;
}): Promise<User | null>;

async function _getCurrentUser({ redirectIfNotFound = false } = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) return redirect("/sign-in");
    return null;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);
