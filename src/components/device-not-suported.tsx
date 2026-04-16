import { LogOutIcon, XIcon } from "lucide-react";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { LogOutButton } from "@/auth/components/log-out-button";
import Link from "next/link";

export function DeviceNotSuported() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background text-center xl:hidden">
      <MaxWidthWrapper className="max-w-md">
        <div className="flex flex-col items-center rounded-lg border border-dashed border-muted-foreground/50 bg-muted p-6">
          <div className="mb-6 rounded-sm bg-destructive/60 p-2 text-destructive-foreground">
            <XIcon />
          </div>
          <div className="mb-6">
            <h1 className="text-bold mb-2 text-lg">Device not supported</h1>
            <p className="text-muted-foreground">
              {
                "This app doesn't work on phones or tablets. To continue, please use a computer or laptop."
              }
            </p>
          </div>
          <Link href="/dashboard/orders">Go to orders</Link>
          <LogOutButton className="mt-4 w-full">
            <LogOutIcon />
            Logout
          </LogOutButton>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
