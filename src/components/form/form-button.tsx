import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

type FormButtonProps = {
  isLoading: boolean;
  label: string;
  isDisabled?: boolean;
  className?: string;
};
export const FormButton = ({
  isLoading,
  isDisabled = false,
  label,
  className,
}: FormButtonProps) => {
  return (
    <Button
      disabled={isLoading || isDisabled}
      className={cn(
        "flex w-36 items-center justify-center self-end justify-self-end",
        className,
      )}
      type="submit"
    >
      {isLoading ? <Loader className="aminate-spin" size={15} /> : label}
    </Button>
  );
};
