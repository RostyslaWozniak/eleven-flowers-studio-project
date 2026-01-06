"use server";

import { cookies } from "next/headers";
import { removeUserFromSession } from "../core/session";

export async function logOut() {
  try {
    await removeUserFromSession(await cookies());
  } catch (err) {
    console.log(err);
    return "Coś poszło nie tak. Sprobuj ponownie.";
  }
}
