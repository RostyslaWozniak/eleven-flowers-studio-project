"use client";

import { type ButtonProps } from "@/components/ui/button";
import { logOut } from "../actions/logout-action";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";

export function LogOutButton({ children, className, ...props }: ButtonProps) {
  const [isPending, startTransition] = useTransition();
  function hadnleLogOut() {
    startTransition(async () => {
      const error = await logOut();
      if (error) {
        toast.error(error);
      }
    });
  }
  return (
    <LoadingButton
      loading={isPending}
      variant="destructive"
      onClick={hadnleLogOut}
      className={className}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}
