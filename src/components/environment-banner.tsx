import { env } from "@/env";
import { Badge } from "@/components/ui/badge";

export const IS_LOCAL_PROJECT =
  env.NEXT_PUBLIC_SERVER_URL.includes("localhost");
export const IS_TEST_PROJECT =
  env.NEXT_PUBLIC_SERVER_URL.includes("vercel.app");

export function EnvironmentBanner() {
  return (
    <>
      {IS_LOCAL_PROJECT && (
        <div className="sticky top-0 z-[60] grid h-10 w-screen place-items-center bg-black">
          <Badge>THIS IS A LOCAL PROJECT</Badge>
        </div>
      )}
      {IS_TEST_PROJECT && (
        <div className="sticky top-0 z-[60] grid h-10 w-screen place-items-center bg-amber-600">
          <Badge>THIS IS A TEST PROJECT</Badge>
        </div>
      )}
    </>
  );
}
