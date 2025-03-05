import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  (await cookies()).delete("token");

  return new NextResponse("Logged out", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic" },
  });
}
