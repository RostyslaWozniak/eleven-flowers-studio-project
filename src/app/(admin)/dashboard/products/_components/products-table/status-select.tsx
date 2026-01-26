import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { changeProductStatusAction } from "@/features/products/actions/change-product-status.action";
import { cn } from "@/lib/utils";
import { type $Enums } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const statusConfig: Record<$Enums.ProductStatus, { color: string }> = {
  AVAILABLE: { color: "bg-green-500" },
  OUT_OF_STOCK: {
    color: "bg-yellow-500",
  },
  DISCONTINUED: {
    color: "bg-red-500",
  },
};

export function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: $Enums.ProductStatus;
}) {
  const [activeStatus, setActiveStatus] = useState(status);
  const [isPendig, startTransition] = useTransition();

  const handleChange = (e: string) => {
    startTransition(async () => {
      const { error } = await changeProductStatusAction({
        id,
        status: e as $Enums.ProductStatus,
      });

      startTransition(() => {
        if (error == null) {
          toast.success("Status of product updated!");
          setActiveStatus(e as $Enums.ProductStatus);
          return;
        }
        toast.error(error);
      });
    });
  };

  useEffect(() => {
    setActiveStatus(status);
  }, [status]);
  return (
    <Select
      disabled={isPendig}
      defaultValue={activeStatus}
      value={activeStatus}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[170px] min-w-[170px]">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            statusConfig[activeStatus].color,
          )}
        />
        {activeStatus}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(statusConfig).map(([value]) => (
            <SelectItem
              key={value}
              value={value}
              className="flex items-center gap-2"
            >
              <StatusOption status={value as $Enums.ProductStatus} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function StatusOption({ status }: { status: $Enums.ProductStatus }) {
  const { color } = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2 w-2 rounded-full", color)} />
      <div className="flex items-center gap-1">
        <span className="aspect-square h-4">{status}</span>
      </div>
    </div>
  );
}
