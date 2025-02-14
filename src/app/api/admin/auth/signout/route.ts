import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("Logged out", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic" },
  });
}
