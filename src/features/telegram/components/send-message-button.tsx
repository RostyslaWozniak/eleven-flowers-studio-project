"use client";

import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { sendMessageAction } from "../actions/send-message.action";
import { toast } from "sonner";

export function SendMessageButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const { error, data } = await sendMessageAction("TEST!!!");
      startTransition(() => {
        if (error == null) {
          console.log(data);
          toast.success("SUCCESS!!!");
        } else {
          toast.error(error);
        }
      });
    });
  }

  return (
    <LoadingButton loading={isPending} onClick={handleClick}>
      Send
    </LoadingButton>
  );
}
