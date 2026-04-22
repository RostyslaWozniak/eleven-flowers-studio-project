import { ToggleAnimation } from "@/components/animations/toogle-comp-animation";
import { cn } from "@/lib/utils";
import { CarIcon, CheckIcon, ShoppingBagIcon } from "lucide-react";
import { type DeliveryMethod } from "../types/delivery-methods.type";

type DeliveryMethodButtonsProps = {
  deliveryMethod: DeliveryMethod;
  onClick: (method: DeliveryMethod) => void;
};

export function DeliveryMethodsButtons({
  deliveryMethod,
  onClick,
}: DeliveryMethodButtonsProps) {
  return (
    <div className="hidden grid-cols-2 gap-4 px-2 pb-8">
      <button
        className={cn(
          "flex w-full flex-col items-center rounded-md border border-slate-200 p-2",
          {
            "bg-card": deliveryMethod === "delivery",
          },
        )}
        onClick={() => onClick("delivery")}
      >
        <div className="relative aspect-square">
          <ToggleAnimation
            className="h-8 text-primary"
            firstComp={<CarIcon className="size-full" />}
            secondComp={<CheckIcon className="size-full" />}
            isActive={deliveryMethod === "delivery"}
          />
        </div>
        <p className="text-sm">Dostawa</p>
      </button>
      <button
        disabled={false}
        className={cn(
          "flex w-full flex-col items-center rounded-md border border-slate-200 p-2 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "bg-card": deliveryMethod === "pickup",
          },
        )}
        onClick={() => onClick("pickup")}
      >
        <div className="relative aspect-square">
          <ToggleAnimation
            className="h-8 text-primary"
            firstComp={<ShoppingBagIcon className="size-7" />}
            secondComp={<CheckIcon className="size-full" />}
            isActive={deliveryMethod === "pickup"}
          />
        </div>
        <p className="text-sm">Odbóir osobisty</p>
      </button>
    </div>
  );
}
