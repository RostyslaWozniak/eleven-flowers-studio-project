"use server";

import { createUserSession } from "@/auth/core/session";
import { signInSchema, type SignInSchema } from "../schemas/sign-in-schema";
import { cookies } from "next/headers";
import { type User } from "../current-user";
import { env } from "@/env";
import { isValidHash } from "../core/password-hasher";

export async function signIn(unsafeData: SignInSchema): Promise<
  | {
      error: string;
      user: null;
    }
  | {
      user: User;
      error: null;
    }
  | null
> {
  const { success, error, data } =
    await signInSchema.safeParseAsync(unsafeData);

  if (!success)
    return {
      error: error.issues[0]?.message ?? "Validation error",
      user: null,
    };

  const { username, password } = data;

  if (!username || !password)
    return {
      error: "Invalid credentials",
      user: null,
    };

  if (
    (await isValidHash(username, env.ADMIN_HASHED_USERNAME)) &&
    (await isValidHash(password, env.ADMIN_HASHED_PASSWORD))
  ) {
    const user = {
      username: env.ADMIN_HASHED_USERNAME,
      passwordHash: env.ADMIN_HASHED_PASSWORD,
    };
    await createUserSession(user, await cookies());

    return {
      error: null,
      user,
    };
  }

  return {
    error: "Invalid credentials",
    user: null,
  };
}
