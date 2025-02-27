import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      size={props.size ?? "lg"}
      disabled={loading || disabled}
      className={cn("relative flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}
