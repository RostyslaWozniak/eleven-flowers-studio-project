import crypto from "crypto";

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
